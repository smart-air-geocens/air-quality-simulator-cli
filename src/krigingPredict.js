module.exports =  function krigingPredict(x, y, variogram) {
    let i;
    let k = Array(variogram.n);
    for (i = 0; i < variogram.n; i++) {
        k[i] = variogram.model(Math.pow(Math.pow(x - variogram.x[i], 2)
            + Math.pow(y - variogram.y[i], 2), 0.5), variogram.nugget, variogram.range, variogram.sill, variogram.A);
    }
    return matrixMultiply(k, variogram.M, 1, variogram.n, 1)[0];
}

function matrixMultiply(X, Y, n, m, p) {
    let i = 0;
    let j;
    let k;
    let Z = Array(n * p);
    for (; i < n; i++) {
        j = 0;
        for (; j < p; j++) {
            Z[i * p + j] = 0;
            k = 0;
            for (; k < m; k++) {
                Z[i * p + j] += X[i * m + k] * Y[k * p + j];
            }
        }
    }
    return Z;
}
