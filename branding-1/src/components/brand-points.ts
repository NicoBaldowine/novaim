// An intentionally irregular constellation, shared by the mark and its reveal.
// The 37-unit construction circle and the wordmark proportions stay unchanged.
const constellation = [
  [245, 119, 20], [333, 120, 25], [391, 91, 13], [471, 142, 17],
  [551, 191, 20], [577, 272, 25], [623, 319, 13], [601, 411, 17],
  [579, 504, 21], [507, 552, 25], [477, 609, 13], [383, 618, 18],
  [289, 623, 21], [220, 573, 25], [156, 563, 13], [120, 476, 17],
  [83, 388, 21], [111, 306, 25], [101, 242, 13], [173, 181, 17],
  [194, 263, 25], [281, 229, 18], [399, 186, 25], [458, 257, 18],
  [536, 354, 25], [485, 434, 18], [416, 540, 25], [325, 515, 18],
  [205, 482, 25], [199, 388, 18],
];
const extent = Math.max(...constellation.map(([x, y, r]) => Math.hypot(x - 350, y - 355) + r));
const scale = 36.7 / extent;
export const brandPoints = constellation.map(([x, y, r]) => ({
  x: 50 + (x - 350) * scale,
  y: 50 + (y - 355) * scale,
  r: r * scale,
}));
