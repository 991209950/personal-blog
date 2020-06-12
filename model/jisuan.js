function ge(i) {
    switch (i) {
        case 0: {
            return 7;
        }
        case 1: {
            return 2;
        }
        case 2: {
            return 8;
        }
        case 3: {
            return 5;
        }
        case 4: {
            return 1;
        }
        case 5: {
            return 9;
        }
        case 6: {
            return 6;
        }
        case 7: {
            return 0;
        }
        case 8: {
            return 3;
        }
        case 9: {
            return 4;
        }
    }
}
function shi(i) {
    switch (i) {
        case 0: {
            return 5;
        }
        case 1: {
            return 7;
        }
        case 2: {
            return 1;
        }
        case 3: {
            return 0;
        }
        case 4: {
            return 9;
        }
        case 5: {
            return 6;
        }
        case 6: {
            return 8;
        }
        case 7: {
            return 2;
        }
        case 8: {
            return 4;
        }
        case 9: {
            return 3;
        }
    }
}
function bai(i) {
    switch (i) {
        case 0: {
            return 8;
        }
        case 1: {
            return 4;
        }
        case 2: {
            return 1;
        }
        case 3: {
            return 7;
        }
        case 4: {
            return 3;
        }
        case 5: {
            return 9;
        }
        case 6: {
            return 5;
        }
        case 7: {
            return 2;
        }
        case 8: {
            return 0;
        }
        case 9: {
            return 6;
        }
    }
}
function qian(i) {
    switch (i) {
        case 0: {
            return 6;
        }
        case 1: {
            return 5;
        }
        case 2: {
            return 0;
        }
        case 3: {
            return 8;
        }
        case 4: {
            return 7;
        }
        case 5: {
            return 4;
        }
        case 6: {
            return 1;
        }
        case 7: {
            return 2;
        }
        case 8: {
            return 9;
        }
        case 9: {
            return 3;
        }
    }
}
function wan(i) {
    switch (i) {
        case 0: {
            return 1;
        }
        case 1: {
            return 7;
        }
        case 2: {
            return 2;
        }
        case 3: {
            return 4;
        }
        case 4: {
            return 3;
        }
        case 5: {
            return 5;
        }
        case 6: {
            return 9;
        }
        case 7: {
            return 0;
        }
        case 8: {
            return 6;
        }
        case 9: {
            return 8;
        }
    }
}
function shiwan(i) {
    switch (i) {
        case 0: {
            return 3;
        }
        case 1: {
            return 2;
        }
        case 2: {
            return 9;
        }
        case 3: {
            return 4;
        }
        case 4: {
            return 8;
        }
        case 5: {
            return 1;
        }
        case 6: {
            return 0;
        }
        case 7: {
            return 6;
        }
        case 8: {
            return 5;
        }
        case 9: {
            return 7;
        }
    }
}
function ku(i) {
    var a = i % 4;
    var n = parseInt(i / 4);
    switch (a) {
        case 1: {
            return n;
        }
        case 2: {
            return 749999 - n;
        }
        case 3: {
            if (n % 2) {
                return 374999 - parseInt(n / 2);
            } else {
                return 374999 + parseInt(n / 2) + 1;
            }
        }
        case 0: {
            if (n % 2) {
                return 750000 + parseInt(n / 2);
            } else {
                return 999999 - parseInt(n / 2);
            }
        }
    }
}
function zhenghe(i) {
    return shiwan(parseInt(i / 100000)).toString() + wan(parseInt(i / 10000) % 10) +
        qian(parseInt(i / 1000) % 10) + bai(parseInt(i / 100) % 10) + shi(parseInt(i / 10) % 10) +
        ge(i % 10);
} 
function suiji(i) {
    if(i == 893786) {
        return '683131';
    }
    if(i == 971443) {
        return '751060';
    }
    var a = ku(ku(ku(i)));
    var kkkk = zhenghe(zhenghe(a));
    var len = kkkk.length;
    for (var j = 6; j > len; j--) {

        kkkk = 0 + kkkk;
    }
    return kkkk;
}
module.exports = suiji;