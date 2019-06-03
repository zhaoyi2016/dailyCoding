/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
    const map = {};
    J.split("").forEach(j => map[j]=1);
    let sum = 0;
    S.split("").forEach(s => {
        if (map.hasOwnProperty(s)) {
            sum += 1;
        }
    });
    return sum;
};
