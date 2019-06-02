/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = {};
    let result;
    nums.forEach((num, i) => {
        if (map.hasOwnProperty(target - num)) {
            result = [map[target - num], i];
        }
        map[num] = i;
    });
    return result;
};
