export const toPreciseNumber = (n, precise = 4) => parseFloat(n.toFixed(precise));

export const formatTime = (seconds = 0) => new Date(seconds * 1000).toISOString().substr(11, 8);
