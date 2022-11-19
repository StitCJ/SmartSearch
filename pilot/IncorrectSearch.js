
document.getElementById("searchButton").onclick = function() {
    let searchInput = document.getElementById("searchInput").value;
    let ref = document.getElementById("ref").getElementsByTagName("li");
    var maxResult = incorrectSearch(ref[0].textContent, searchInput, 50, -1, -2);
    var matching = ref[0].textContent;
    for (let i=1; i < ref.length; i++) {
        var tmpRef = ref[i].textContent;
        var tmpResult = incorrectSearch(tmpRef, searchInput, 50, -1, -2);
        if(tmpResult>maxResult) {
            maxResult = tmpResult;
            matching = ref[i].textContent;
        }
    }
    document.getElementById("resultLabel").innerHTML = matching;
}


function mMatrix (ref, input, gap) {
    var row = ref.length+1;
    var column = input.length+1;

    let result = matrix(row, column);
    for(let i=0; i<row; i++) {
        result[i][0] = i * gap;
    }
    for(let i=0; i<column; i++) {
        result[0][i] = i * gap;
    }
    return result;
}

function matrix(rows, columns) {
    let result = new Array(rows);

    for(let i=0; i<rows; i++) {
        result[i] = new Array(columns);
    }
    return result;
}

function matchOrMismatch(a, b, match, mismatch) {
    if (a==b) {
        return match;
    }
    else {
        return mismatch;
    }
}

function incorrectSearch(ref, input, match, mismatch, gap) {
    
    var row = ref.length+1;
    var column = input.length+1;

    var r = 1;
    var c = 1;
    let M = mMatrix(ref, input, gap);
    while (r < row) {
        while (c < column) {
            M[r][c] = Math.max(M[r-1][c-1] + matchOrMismatch(ref.charAt(r-1), input.charAt(c-1), match, mismatch), M[r-1][c] + gap, M[r][c-1] + gap);
            c += 1;
        }
        r += 1;
        c = 1;
    }
    return M[row-1][column-1];
}