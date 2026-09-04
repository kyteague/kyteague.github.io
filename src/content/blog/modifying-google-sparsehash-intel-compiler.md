---
title: "Modifying Google Sparsehash for the Intel Compiler"
description: "A small compatibility patch for using Google Sparsehash with the Intel C++ Compiler."
pubDate: "2011-03-24T18:00:00Z"
updatedDate: "2026-09-03"
tags:
  - hash set
  - hash map
  - icc
  - icpc
  - intel
  - sparse hash
heroImage: "../../assets/sparsehash-compiler-compatibility.webp"
---

I recently needed a hash map/set implementation for a C++ project. No problem I thought. I went over and grabbed [Google's Sparsehash implementation](https://github.com/sparsehash/sparsehash) and I was off and running. Things came to a screeching halt when I tried to compile my code with the Intel C++ Compiler. Usually this gives me a 30–40% speed increase for CPU-bound code, but only if it can actually compile. After a couple hours of searching and trying various other hash map implementations I realized I was going to have to fix this myself.

The problem lies in Sparsehash's reliance on the `std::tr1` namespace. This adds lots of neat things like smart pointers and regular expressions, but unfortunately g++'s implementation is not compatible with ICPC even when using the compiler flag `-std=c++0x`.

To remove the reliance we're going to need to make a couple of changes and unfortunately, these changes will require you to always define your own hash function. First we'll need to modify `/usr/include/google/sparsehash/sparseconfig.h` adding `#ifndef __ICC` around the bad parts so it looks like this:

```cpp
/* Namespace for Google classes */
#define GOOGLE_NAMESPACE ::google

#ifndef __ICC
/* the location of the header defining hash functions */
#define HASH_FUN_H <tr1/functional>


/* the namespace of the hash<> function */
#define HASH_NAMESPACE std::tr1
#endif
```

and then further down

```cpp
#ifndef __ICC
/* The system-provided hash function including the namespace. */
#define SPARSEHASH_HASH HASH_NAMESPACE::hash
#endif
```

Then in all the of the following files: `sparse_hash_set`, `sparse_hash_map`, `dense_hash_set`, and `dense_hash_map` we'll make the following changes.

```cpp
#include HASH_FUN_H // defined in config.h
```

to

```cpp
#ifdef HASH_FUN_H
#include HASH_FUN_H // defined in config.h
#endif
```

and

```cpp
class HashFcn = SPARSEHASH_HASH, // defined in sparseconfig.h
```

to

```cpp
#ifdef SPARSEHASH_HASH
class HashFcn = SPARSEHASH_HASH, // defined in sparseconfig.h
#else
class HashFcn,
#endif
```

And there you go! Google's efficient hash map/set implementation for the Intel Compiler. Fortunately the keys for all my `hash_maps` were integers so I didn't really need a hash function, but Intel provides much faster ones in their IPP Crypto package anyways. Enjoy the performance boost!
