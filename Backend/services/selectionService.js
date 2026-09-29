const ALLOWED_PERCENTAGES = [10, 20, 25, 33, 50, 100];

function selectRows(rows, percentage, method) {
  if (!ALLOWED_PERCENTAGES.includes(percentage)) {
    throw new Error("Invalid percentage.");
  }

  if (!["random", "interval"].includes(method)) {
    throw new Error("Invalid selection method.");
  }

  const totalRows = rows.length;

  if (method === "random") {
    const count = Math.floor((totalRows * percentage) / 100);

    // Create an array of all row indexes.
    const indexes = Array.from( { length: totalRows }, (_, index) => index );

    // Fisher-Yates shuffle: randomize indexes without duplicates.
    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }

    // Return the requested number, in original row order.
    return indexes
      .slice(0, count)
      .sort((a, b) => a - b);
  }

  // Interval method
  const interval = percentage === 100
    ? 1
    : Math.round(100 / percentage);

  const selectedIndexes = [];

  for (let i = interval - 1; i < totalRows; i += interval) {
    selectedIndexes.push(i);
  }

  return selectedIndexes;
}

module.exports = { selectRows };