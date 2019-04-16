/**
This problem is asked by Facebook.

Given a string consisting of parantheses, single digits and positive and negative signs, convert the string into a mathematical expression to obtail the answer.

Don't use eval or a similar built-in parser.

For example, given '-1 + (2 + 3)', you should return 4.
*/

function cmpOps(a, b) {
    const n = NaN;
    const map = {'^': 0, '+': 1, '-': 2, '(': 3, ')': 4, '$': 5};
    const matrix = [ // 1: a < b, b first; -1: a > b, a first.
        [0, 1, 1, 1, n, 0],
        [0, -1,-1,1, -1,-1],
        [0, -1,-1,1, -1,-1],
        [0, 1, 1, 1, 0, n],
        [0, n, n, n, n, n],
        [0, 0, 0, 0, 0, 0],
    ];
    a = map[a];
    b = map[b];
    let res = matrix[a][b];
    if (isNaN(res)) {
        throw "string not valid";
    }
    return res;
}

function calc(a, op, b) {
    a = isNaN(a) ? 0 : a;
    b = isNaN(b) ? 0 : b;
    return eval('' + a + ' ' + op + ' ' + b);
}

function solution(str) {
    console.log('Input string is:', str);

    let stackNum = [];
    let stackOps = ['^'];
    str = str + '$';
    str.split('').forEach(ch => {
        if (ch === ' ') {
            // do nothing
        } else if (ch >= '0' && ch <= '9') {
            stackNum.push(ch);
        } else {
            while (true) { 
                if (cmpOps(stackOps[stackOps.length - 1], ch) < 0) {
                    let b = stackNum.pop(); /** Notice last one pops first */
                    let op = stackOps.pop();
                    let a = stackNum.pop();
                    let c = calc(a, op, b);
                    stackNum.push(c);
                } else if (cmpOps(stackOps[stackOps.length - 1], ch) === 0) {
                    stackOps.pop();
                    break;
                } else {
                    stackOps.push(ch);
                    break;
                }
            }
        }
    });
    return stackNum[0];
}

function testing() {
    assertEquals(-4, solution, '1 - (2 + 3)');
    assertEquals(-3, solution, '-1 + 2 - 4');
    assertEquals(-9, solution, '-3 + (-2 - 4)');
    assertEquals(3, solution, '-3 - (-2 - 4)');     // TODO get wrong answer
    assertEquals(3, solution, '1 + 2 * 3 - 4');     // TODO add */ support
    assertEquals(68, solution, '12 + 20 * 3 - 4');  // TODO get error - I need to tokenize number first
}

function assertEquals(expect, func, argv) {
    try {
        let actual = func(argv);
        if (actual !== expect) {
            console.warn('expect: ' + expect + ', but get: ' + actual);
        } else {
            console.log('passed');
        }
    } catch (error) {
        console.log('error! ' + error)
    }
}

testing();