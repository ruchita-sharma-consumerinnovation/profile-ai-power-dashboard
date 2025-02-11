export function generateColorPalette(count: number): string[] {
    const colors = [
      "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a28cd9", "#8dd1e1", "#ff6b6b",
      "#6a5acd", "#32cd32", "#ffb74d", "#d45087", "#003f5c", "#7a5195", "#ef5675",
      "#ffa600", "#bc5090", "#2f4b7c", "#ffbb78", "#98df8a", "#aec7e8", "#ff9896",
      "#c5b0d5", "#e377c2", "#17becf", "#1f77b4", "#f7b6d2", "#d62728", "#9467bd",
      "#2ca02c", "#e7969c", "#8c564b"
    ];
  
    return colors.slice(0, count);
  }
  
  