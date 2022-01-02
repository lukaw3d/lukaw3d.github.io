# `ky` gets stuck if you make a large request. And it won't be fixed

_or: ky hangs with large response in Node_ <br>
_or: afterResponse hook causes ky promise to never resolve_ <br>
_or: ky method shortcuts high memory usage_ <br>

Because of how ky clones response in many configurations:
- browser needs to buffer the whole response
- nodejs pauses downloading and waits forever

So you might see this as:
- loads of memory usage
- nodejs script getting stuck but not crashing

And it won't be fixed, nor made consistent: https://github.com/sindresorhus/ky/pull/356
