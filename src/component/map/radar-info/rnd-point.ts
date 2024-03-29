interface OnePoint {
    top: number,
    left: number
}

/**
 * 根据信号值返回第n环
 */
const getLoopIndex = (rssi: number) => {
    if (rssi >= -10) {
        return 1;
    } else if (rssi < -10 && rssi >= -20) {
        return 2;
    } else if (rssi < -20 && rssi >= -30) {
        return 3;
    } else if (rssi < -30 && rssi >= -40) {
        return 4;
    } else if (rssi < -40 && rssi >= -50) {
        return 5;
    } else if (rssi < -50 && rssi >= -60) {
        return 6;
    } else if (rssi < -60 && rssi >= -70) {
        return 7;
    } else if (rssi < -70 && rssi >= -80) {
        return 8;
    } else if (rssi < -80 && rssi >= -90) {
        return 9;
    } else {
        return 10;
    }
}

const pointMap: Map<number, OnePoint[]> = new Map();

pointMap.set(10, [{
    top: 0,
    left: 43
}, {
    top: 4,
    left: 59
}, {
    top: 12,
    left: 74
}, {
    top: 18,
    left: 78
}, {
    top: 25,
    left: 84
}, {
    top: 34,
    left: 88
}, {
    top: 55,
    left: 90
}, {
    top: 65,
    left: 86
}, {
    top: 72,
    left: 83
}, {
    top: 78,
    left: 78
}, {
    top: 88,
    left: 66
}, {
    top: 93,
    left: 50
}, {
    top: 93,
    left: 36
}, {
    top: 89,
    left: 25
}, {
    top: 82,
    left: 16
}, {
    top: 74,
    left: 8
}, {
    top: 67,
    left: 4
}, {
    top: 58,
    left: 0
}, {
    top: 49,
    left: -1
}, {
    top: 40,
    left: 0
}, {
    top: 27,
    left: 3
}, {
    top: 20,
    left: 7
}, {
    top: 12,
    left: 15
}, {
    top: 7,
    left: 23
}]);
pointMap.set(9, [{
    top: 7,
    left: 45
}, {
    top: 9,
    left: 57
}, {
    top: 14,
    left: 65
}, {
    top: 19,
    left: 74
}, {
    top: 26,
    left: 78
}, {
    top: 33,
    left: 81
}, {
    top: 42,
    left: 84
}, {
    top: 49,
    left: 84
}, {
    top: 56,
    left: 83
}, {
    top: 65,
    left: 80
}, {
    top: 71,
    left: 76
}, {
    top: 76,
    left: 73
}, {
    top: 82,
    left: 66
}, {
    top: 89,
    left: 49
}, {
    top: 89,
    left: 37
}, {
    top: 85,
    left: 28
}, {
    top: 81,
    left: 19
}, {
    top: 76,
    left: 13
}, {
    top: 68,
    left: 8
}, {
    top: 63,
    left: 5
}, {
    top: 59,
    left: 3
}, {
    top: 53,
    left: 2
}, {
    top: 47,
    left: 2
}, {
    top: 39,
    left: 3
}, {
    top: 33,
    left: 7
}, {
    top: 25,
    left: 10
}, {
    top: 18,
    left: 15
}, {
    top: 11,
    left: 26
}]);
pointMap.set(8, [{
    top: 13,
    left: 40
}, {
    top: 15,
    left: 56
}, {
    top: 21,
    left: 67
}, {
    top: 28,
    left: 73
}, {
    top: 35,
    left: 77
}, {
    top: 42,
    left: 79
}, {
    top: 49,
    left: 80
}, {
    top: 58,
    left: 77
}, {
    top: 63,
    left: 75
}, {
    top: 69,
    left: 73
}, {
    top: 76,
    left: 67
}, {
    top: 83,
    left: 53
}, {
    top: 83,
    left: 37
}, {
    top: 80,
    left: 26
}, {
    top: 73,
    left: 18
}, {
    top: 68,
    left: 13
}, {
    top: 60,
    left: 10
}, {
    top: 53,
    left: 8
}, {
    top: 46,
    left: 7
}, {
    top: 40,
    left: 9
}, {
    top: 33,
    left: 11
}, {
    top: 26,
    left: 15
}, {
    top: 20,
    left: 21
}, {
    top: 15,
    left: 28
}]);
pointMap.set(7, [{
    top: 17,
    left: 44
}, {
    top: 19,
    left: 55
}, {
    top: 24,
    left: 62
}, {
    top: 30,
    left: 69
}, {
    top: 37,
    left: 73
}, {
    top: 44,
    left: 74
}, {
    top: 51,
    left: 75
}, {
    top: 59,
    left: 73
}, {
    top: 52,
    left: 75
}, {
    top: 66,
    left: 70
}, {
    top: 73,
    left: 63
}, {
    top: 78,
    left: 50
}, {
    top: 78,
    left: 35
}, {
    top: 73,
    left: 25
}, {
    top: 67,
    left: 18
}, {
    top: 60,
    left: 15
}, {
    top: 53,
    left: 13
}, {
    top: 48,
    left: 12
}, {
    top: 40,
    left: 14
}, {
    top: 35,
    left: 16
}, {
    top: 29,
    left: 19
}, {
    top: 22,
    left: 27
}]);
pointMap.set(6, [{
    top: 23,
    left: 40
}, {
    top: 25,
    left: 54
}, {
    top: 31,
    left: 62
}, {
    top: 37,
    left: 67
}, {
    top: 43,
    left: 70
}, {
    top: 50,
    left: 70
}, {
    top: 57,
    left: 68
}, {
    top: 64,
    left: 64
}, {
    top: 71,
    left: 57
}, {
    top: 74,
    left: 47
}, {
    top: 72,
    left: 33
}, {
    top: 68,
    left: 26
}, {
    top: 62,
    left: 21
}, {
    top: 54,
    left: 18
}, {
    top: 42,
    left: 18
}, {
    top: 48,
    left: 18
}, {
    top: 36,
    left: 21
}, {
    top: 29,
    left: 26
}]);
pointMap.set(5, [{
    top: 27,
    left: 48
}, {
    top: 32,
    left: 56
}, {
    top: 39,
    left: 63
}, {
    top: 44,
    left: 65
}, {
    top: 51,
    left: 65
}, {
    top: 57,
    left: 64
}, {
    top: 63,
    left: 59
}, {
    top: 69,
    left: 49
}, {
    top: 67,
    left: 34
}, {
    top: 62,
    left: 27
}, {
    top: 57,
    left: 24
}, {
    top: 51,
    left: 22
}, {
    top: 44,
    left: 23
}, {
    top: 38,
    left: 25
}, {
    top: 32,
    left: 30
}, {
    top: 29,
    left: 36
}]);
pointMap.set(4, [{
    top: 33,
    left: 50
}, {
    top: 38,
    left: 56
}, {
    top: 44,
    left: 60
}, {
    top: 50,
    left: 60
}, {
    top: 56,
    left: 58
}, {
    top: 62,
    left: 54
}, {
    top: 64,
    left: 41
}, {
    top: 60,
    left: 32
}, {
    top: 54,
    left: 28
}, {
    top: 48,
    left: 26
}, {
    top: 42,
    left: 28
}, {
    top: 35,
    left: 34
}]);
pointMap.set(3, [{
    top: 36,
    left: 45
}, {
    top: 42,
    left: 53
}, {
    top: 48,
    left: 55
}, {
    top: 55,
    left: 54
}, {
    top: 58,
    left: 45
}, {
    top: 55,
    left: 36
}, {
    top: 50,
    left: 34
}, {
    top: 44,
    left: 33
}, {
    top: 39,
    left: 37
}]);
pointMap.set(2, [{
    top: 41,
    left: 45
}, {
    top: 46,
    left: 50
}, {
    top: 48,
    left: 52
}, {
    top: 52,
    left: 50
}, {
    top: 53,
    left: 42
}, {
    top: 46,
    left: 39
}]);
pointMap.set(1, [{
    top: 45,
    left: 45
}, {
    top: 47,
    left: 48
}, {
    top: 46,
    left: 46
}]);
export { pointMap, getLoopIndex };