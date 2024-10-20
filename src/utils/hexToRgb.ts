export const hexToRgb = (hex: string): {r: number; g: number; b: number} | null => {
   // 16進数カラーコードの形式を確認（#が先頭に付いていること）
  const match = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex);
  if (!match) {
    return null; // 無効なカラーコード
  }

  let r: number, g: number, b: number;
  if (match[1].length === 6) {
    // 6桁の場合
    r = parseInt(match[1].substring(0, 2), 16);
    g = parseInt(match[1].substring(2, 4), 16);
    b = parseInt(match[1].substring(4, 6), 16);
  }
  else {
    // 3桁の場合（例: #F00）
    r = parseInt(match[1][0]+match[1][0], 16);
    g = parseInt(match[1][1]+match[1][1], 16);
    b = parseInt(match[1][2]+match[1][2], 16);
  }

  return { r, g, b };
}