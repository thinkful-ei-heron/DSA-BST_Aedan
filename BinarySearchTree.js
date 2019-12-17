

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.right = null;
        this.left = null;
    }

    insert(key, value) {
        if (this.key === null) {
            this.key = key;
        }
        else {
            let direction = null;
            if (key < this.key) {
                direction = 'left';
            } else direction = 'right';

            if (this[direction] === null) {
                this[direction] = new BinarySearchTree(key, value, this);
            }
            else {
                this[direction].insert(key, value);
            }
        }
    }

    remove(key) {
        if (this.key === null) return null;
        if (this.key === key) {
            let replacement = null;
            let min = null;
            if (this.right !== null && this.left !== null) {
                min = this.findMin(this.right);
            }
            else if (this.right !== null) replacement = this.right;
            else if (this.left !== null) replacement = this.left;


            if (min !== null) {
                replacement = min;
                let theirReplacement = null;
                if (replacement.right !== null) theirReplacement = replacement.right;
                else if (replacement.left !== null) theirReplacement = replacement.left;

                this.replace(replacement, theirReplacement);
            }

            this.replace(this, replacement);
        }
        else {
            let direction = null;
            if (key < this.key) {
                direction = 'left';
            } else direction = 'right';

            if (this[direction] === null) return null;
            return this[direction].remove(key);
        }
    }

    replace(my, myReplacement) {
        let myParent = my.parent;
        if (myParent !== null) {
            my.parent = null;

            let myDirection = null;
            if (my.key < myParent.key) {
                myDirection = 'left';
            } else myDirection = 'right';

            myParent[myDirection] = myReplacement;
        }
        else {
            my.key = myReplacement.key;
            my.value = myReplacement.value;
        }

    }

    findMin(tree) {
        if (tree.left === null) {
            return tree;
        }
        return this.findMin(tree.left);
    }

    findMax(tree) {
        if (tree.right === null) {
            return tree;
        }
        return this.findMax(tree.right);
    }

    find(key) {
        if (this === null) return 'Not Found.';
        if (this.key === key) return this.value;

        let direction = null;
        if (key < this.key) {
            direction = 'left';
        } else direction = 'right';

        if (this[direction] === null) return 'Not Found.';
        return this[direction].find(key);
    }
}



//O(n)
function findHeight(bst) {
    let left = 0;
    let right = 0;
    if (bst.left !== null) left = findHeight(bst.left) + 1;
    if (bst.right !== null) right = findHeight(bst.right) + 1;



    let bigger = left > right ? left : right;
    return bigger;
}


function isBST(bst) {
    if (bst === null) return false;

    try {
        let head = bst.key;
        let left = true;
        let right = true;
        let lResults = null;
        let rResults = null;

        if (bst.left !== null) {
            left = false;
            if (head > bst.left.key) {
                left = true;
                lResults = isBST(bst.left);
                if (!lResults) return false;
            }
        }
        if (bst.right !== null) {
            right = false;
            if (head < bst.right.key) {
                right = true;
                rResults = isBST(bst.right);
                if (!rResults) return false;
            }
        }

        if (left && right) {
            return true;
        } else return false;
    }
    catch (e) {
        return false;
    }
}



function nthLargest(bst, n) {

    function findNextLargest(bst, n) {
        if (n === 0) return bst;

        let nextLargest = null;
        if (bst.left !== null) {
            nextLargest = bst.findMax(bst.left);
            return findNextLargest(nextLargest, n - 1);
        }

        let previous = bst;
        let current = bst.parent;
        while (previous.key <= current.key) {
            previous = current;
            current = current.parent;
        }
        return findNextLargest(current, n - 1);


    }

    if (bst === null) return null;
    let largest = bst.findMax(bst);
    //console.log(largest)

    return findNextLargest(largest, n - 1);

}



function balanced(bst) {

    function balancer(bst) {
        let left = 0;
        let right = 0;
        if (bst.left !== null) left = balancer(bst.left);
        if (bst.right !== null) right = balancer(bst.right);
    
        if(left === false || right === false) return false;
    
    
        let bigger = left > right ? left + 1: right + 1;
        let smaller = left < right? left + 1:right + 1;
    
        if(bigger-smaller <= 1) return bigger;
        return false;
    }

    let result = balancer(bst);
    if(result === false) return false;
    else return true;
}


//O(n^2)
function same(a, b) {
    if(a.length === 1 && b.length === 1 && a[0] === b[0]) return true;
    let pivota = a[0];
    let topPivota = null;
    let bottomPivota = null;
    let pivotb = b[0];
    let topPivotb = null;
    let bottomPivotb = null;
    let aTopArr = [];
    let aBottomArr = [];
    let bTopArr = [];
    let bBottomArr = [];
    

    if(a.length !== b.length || pivota !== pivotb) return false;
    for(let i = 1; i < a.length; i ++) {

        if(a[i] > pivota && topPivota === null) topPivota = a[i];
        else if(a[i] < pivota && bottomPivota === null) bottomPivota = a[i];

        if(a[i] > pivota) aTopArr.push(a[i]);
        else aBottomArr.push(a[i]);



        if(b[i] > pivotb && topPivotb === null) topPivotb = b[i];
        else if(b[i] < pivotb && bottomPivotb === null) bottomPivotb = b[i];

        if(b[i] > pivotb) bTopArr.push(b[i]);
        else bBottomArr.push(b[i]);
    }

    if(topPivota !== topPivotb || bottomPivota !== bottomPivotb || aTopArr.length !== bTopArr.length || aBottomArr.length !== bBottomArr.length) {
        return false;
    }
    return same(aTopArr, bTopArr) && same(aBottomArr, bBottomArr);
}


function main() {
    let bst = new BinarySearchTree();

    bst.insert(3, 3);
    bst.insert(1, 1);
    bst.insert(4, 4);
    bst.insert(6, 6);
    bst.insert(9, 9);
    bst.insert(2, 2);
    bst.insert(5, 5);
    bst.insert(7, 7);



    console.log(nthLargest(bst, 8));

    console.log(bst.find(7));
    console.log(bst.find(2));
    bst.remove(2);
    console.log(bst.find(7));
    console.log(bst.find(2));
    bst.remove(3);
    console.log(bst.find(7));

    console.log(bst);

    console.log(tree(bst));
    console.log(findHeight(bst));
    console.log(isBST(bst));
    console.log(isBST(123));

    
    let balBST = new BinarySearchTree();
    
    balBST.insert(5);
    balBST.insert(3);
    balBST.insert(4);
    balBST.insert(2);
    balBST.insert(7);
    balBST.insert(6);
    balBST.insert(8);
    balBST.insert(9);
    
    
    console.log(balanced(bst));
    console.log(balanced(balBST));

    let easy = new BinarySearchTree();

    easy.insert('E', 'E');
    easy.insert('A', 'A');
    easy.insert('S', 'S');
    easy.insert('Y', 'Y');
    easy.insert('Q', 'Q');
    easy.insert('U', 'U');
    easy.insert('E', 'E');
    easy.insert('S', 'S');
    easy.insert('T', 'T');
    easy.insert('I', 'I');
    easy.insert('O', 'O');
    easy.insert('N', 'N');


    let arr1 = [3, 5, 4, 6, 1, 0, 2];
    let arr2 = [3, 1, 5, 2, 4, 6, 0];
    let arr3 = [3, 1, 6, 2, 4, 5, 0];
    console.log('same ' + same(arr1, arr2));
    console.log('same ' + same(arr1, arr3));
}


main();



function tree(t) {
    if (!t) {
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right);
}

// 4. What does this program do?
// it adds the values of the 'nodes' below it
// 32 is output after running on bst after 2 and 3 have been deleted.