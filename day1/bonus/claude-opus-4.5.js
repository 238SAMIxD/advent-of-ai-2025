const fs = require('fs');

// Read the input file
const input = fs.readFileSync('../input.txt', 'utf8').trim().split('\n');

// Parse the rotations
const rotations = input.map(line => {
    const direction = line[0];
    const distance = parseInt(line.slice(1));
    return { direction, distance };
});

// Start at position 50
let position = 50;
let zeroCount = 0;

// Process each rotation
for (const { direction, distance } of rotations) {
    if (direction === 'L') {
        // Left means toward lower numbers
        // Count how many times we pass through 0
        // We pass through 0 if we cross from low to high (wrapping)
        // or if we end exactly at 0
        
        // Calculate how many full rotations + the final position
        const newPosition = ((position - distance) % 100 + 100) % 100;
        
        // Count zeros: we pass through 0 each time we wrap around
        // If going left from position P by distance D:
        // We cross 0 when we go below 0 and wrap to 99
        // Number of times = floor((position + (100 - newPosition if newPosition > position else -newPosition)) / 100)
        
        // Simpler: count how many times we cross from 0 to 99
        // If position >= newPosition: we went straight down, crossed 0 if position >= 0 and newPosition <= 0 (but positions are 0-99)
        // Actually: if we move left by D from P, we cross 0 floor((P + 1 + D - 1) / 100) times if D > P, otherwise 0 times
        // Wait, let's think differently:
        // Moving left from P by D clicks means we visit P-1, P-2, ..., wrapping as needed
        // We visit 0 each time we complete going from some position down to 0
        
        // The number of times we hit 0 going left from position by distance:
        // = floor((position + distance) / 100) if position < 100
        // But we need to be careful: we hit 0 when we reach it, not pass it
        
        // Going left: we hit 0 when our running position becomes 0
        // Starting at P, after k clicks left, we're at (P - k + 100) % 100
        // This equals 0 when P - k ≡ 0 (mod 100), i.e., k ≡ P (mod 100)
        // So we hit 0 at clicks: P, P+100, P+200, ... (if within distance)
        // Number of hits = floor((distance - position) / 100) + 1 if position <= distance, else 0
        // Wait, that's not quite right either.
        
        // Let me reconsider: starting at position P, going left by D clicks
        // At click k (1 <= k <= D), we're at (P - k + 100) % 100
        // This equals 0 when (P - k) % 100 == 0
        // i.e., k % 100 == P % 100, so k = P, P+100, P+200, ...
        // Number of such k in [1, D] = floor((D - P) / 100) + 1 if P >= 1 and P <= D
        //                            = floor(D / 100) if P == 0
        
        if (position === 0) {
            // We start at 0, so we hit 0 at clicks 100, 200, 300, ...
            zeroCount += Math.floor(distance / 100);
        } else if (distance >= position) {
            // We hit 0 at click position, position+100, position+200, ...
            zeroCount += Math.floor((distance - position) / 100) + 1;
        }
        
        position = newPosition;
    } else {
        // Right means toward higher numbers
        // Going right from P by D clicks
        // At click k, we're at (P + k) % 100
        // This equals 0 when (P + k) % 100 == 0
        // i.e., k % 100 == (100 - P) % 100 == (100 - P) if P > 0, else 0
        // So k = (100 - P), (100 - P) + 100, ... if P > 0
        // Or k = 100, 200, 300, ... if P == 0
        
        const newPosition = (position + distance) % 100;
        
        if (position === 0) {
            // Start at 0, hit 0 at clicks 100, 200, ...
            zeroCount += Math.floor(distance / 100);
        } else {
            // First hit at click (100 - position), then every 100 after
            const firstHit = 100 - position;
            if (distance >= firstHit) {
                zeroCount += Math.floor((distance - firstHit) / 100) + 1;
            }
        }
        
        position = newPosition;
    }
}

console.log('The password is:', zeroCount);
