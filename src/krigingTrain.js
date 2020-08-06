module.exports =  function krigingTrain(t, x, y, model, sigma2, alpha) {
    return train(t, x, y, model, sigma2, alpha);
}


function max(source) {
    return Math.max.apply(null, source);
}

function min(source) {
    return Math.min.apply(null, source);
}

function rep(source, n) {
    let array = [];
    for (let i = 0; i < n; i++) {
        array.push(source);
    }
    return array;
}

function pip(source, x, y) {
    var i = 0;
    var j = source.length - 1;
    var c = false;
    var length = source.length;
    for (; i < length; j = i++) {
        if (((source[i][1] > y) !== (source[j][1] > y))
            && (x < (source[j][0] - source[i][0]) * (y - source[i][1]) / (source[j][1] - source[i][1]) + source[i][0])) {
            c = !c;
        }
    }
    return c;
}

function matrixDiag(c, n) {
    let i = 0;
    let Z = rep(0, n * n);
    for (; i < n; i++) {
        Z[i * n + i] = c;
    }
    return Z;
}

function matrixTranspose(X, n, m) {
    let i = 0;
    let j;
    let Z = Array(m * n);
    for (; i < n; i++) {
        j = 0;
        for (; j < m; j++) {
            Z[j * n + i] = X[i * m + j];
        }
    }
    return Z;
}

function matrixAdd(X, Y, n, m) {
    let i = 0;
    let j;
    let Z = Array(n * m);
    for (; i < n; i++) {
        j = 0;
        for (; j < m; j++) {
            Z[i * m + j] = X[i * m + j] + Y[i * m + j];
        }
    }
    return Z;
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

function matrixChol(X, n) {
    let i;
    let j;
    let k;
    let p = Array(n);
    for (i = 0; i < n; i++)
        p[i] = X[i * n + i];
    for (i = 0; i < n; i++) {
        for (j = 0; j < i; j++)
            p[i] -= X[i * n + j] * X[i * n + j];
        if (p[i] <= 0)
            return false;
        p[i] = Math.sqrt(p[i]);
        for (j = i + 1; j < n; j++) {
            for (k = 0; k < i; k++)
                X[j * n + i] -= X[j * n + k] * X[i * n + k];
            X[j * n + i] /= p[i];
        }
    }
    for (i = 0; i < n; i++)
        X[i * n + i] = p[i];
    return true;
}

function matrixChol2inv(X, n) {
    let i;
    let j;
    let k;
    let sum;
    for (i = 0; i < n; i++) {
        X[i * n + i] = 1 / X[i * n + i];
        for (j = i + 1; j < n; j++) {
            sum = 0;
            for (k = i; k < j; k++)
                sum -= X[j * n + k] * X[k * n + i];
            X[j * n + i] = sum / X[j * n + j];
        }
    }
    for (i = 0; i < n; i++)
        for (j = i + 1; j < n; j++)
            X[i * n + j] = 0;
    for (i = 0; i < n; i++) {
        X[i * n + i] *= X[i * n + i];
        for (k = i + 1; k < n; k++)
            X[i * n + i] += X[k * n + i] * X[k * n + i];
        for (j = i + 1; j < n; j++)
            for (k = j; k < n; k++)
                X[i * n + j] += X[k * n + i] * X[k * n + j];
    }
    for (i = 0; i < n; i++)
        for (j = 0; j < i; j++)
            X[i * n + j] = X[j * n + i];
}

function matrixSolve(X, n) {
    let m = n;
    let b = Array(n * n);
    let indxc = Array(n);
    let indxr = Array(n);
    let ipiv = Array(n);
    let i;
    let icol = 0;
    let irow = 0;
    let j;
    let k;
    let l;
    let ll;
    let big;
    let dum;
    let pivinv;
    let temp;
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            if (i === j)
                b[i * n + j] = 1;
            else
                b[i * n + j] = 0;
        }
    }
    for (j = 0; j < n; j++)
        ipiv[j] = 0;
    for (i = 0; i < n; i++) {
        big = 0;
        for (j = 0; j < n; j++) {
            if (ipiv[j] !== 1) {
                for (k = 0; k < n; k++) {
                    if (ipiv[k] === 0) {
                        if (Math.abs(X[j * n + k]) >= big) {
                            big = Math.abs(X[j * n + k]);
                            irow = j;
                            icol = k;
                        }
                    }
                }
            }
        }
        ++(ipiv[icol]);
        if (irow !== icol) {
            for (l = 0; l < n; l++) {
                temp = X[irow * n + l];
                X[irow * n + l] = X[icol * n + l];
                X[icol * n + l] = temp;
            }
            for (l = 0; l < m; l++) {
                temp = b[irow * n + l];
                b[irow * n + l] = b[icol * n + l];
                b[icol * n + l] = temp;
            }
        }
        indxr[i] = irow;
        indxc[i] = icol;
        if (X[icol * n + icol] === 0)
            return false;
        pivinv = 1 / X[icol * n + icol];
        X[icol * n + icol] = 1;
        for (l = 0; l < n; l++)
            X[icol * n + l] *= pivinv;
        for (l = 0; l < m; l++)
            b[icol * n + l] *= pivinv;
        for (ll = 0; ll < n; ll++) {
            if (ll !== icol) {
                dum = X[ll * n + icol];
                X[ll * n + icol] = 0;
                for (l = 0; l < n; l++)
                    X[ll * n + l] -= X[icol * n + l] * dum;
                for (l = 0; l < m; l++)
                    b[ll * n + l] -= b[icol * n + l] * dum;
            }
        }
    }
    for (l = (n - 1); l >= 0; l--) {
        if (indxr[l] !== indxc[l]) {
            for (k = 0; k < n; k++) {
                temp = X[k * n + indxr[l]];
                X[k * n + indxr[l]] = X[k * n + indxc[l]];
                X[k * n + indxc[l]] = temp;
            }
        }
    }
    return true;
}

function variogramGaussian(h, nugget, range, sill, A) {
    return nugget + ((sill - nugget) / range)
        * (1.0 - Math.exp(-(1.0 / A) * Math.pow(h / range, 2)));
}

function variogramExponential(h, nugget, range, sill, A) {
    return nugget + ((sill - nugget) / range)
        * (1.0 - Math.exp(-(1.0 / A) * (h / range)));
}

function variogramSpherical(h, nugget, range, sill) {
    if (h > range)
        return nugget + (sill - nugget) / range;
    return nugget + ((sill - nugget) / range)
        * (1.5 * (h / range) - 0.5 * Math.pow(h / range, 3));
}

function train(t, x, y, model, sigma2, alpha) {

    let variogram = {
        t: t,
        x: x,
        y: y,
        nugget: 0.0,
        range: 0.0,
        sill: 0.0,
        A: 1 / 3,
        n: 0,
        model: variogramExponential,
        K: [],
        M: [],
    };
    switch (model) {
        case 'gaussian':
            variogram.model = variogramGaussian;
            break;
        case 'exponential':
            variogram.model = variogramExponential;
            break;
        case 'spherical':
            variogram.model = variogramSpherical;
            break;
        default:
            variogram.model = variogramExponential;
    }
    let i;
    let j;
    let k;
    let l;
    let n = t.length;
    let distance = Array((n * n - n) / 2);
    for (i = 0, k = 0; i < n; i++) {
        for (j = 0; j < i; j++, k++) {
            distance[k] = Array(2);
            distance[k][0] = Math.pow(Math.pow(x[i] - x[j], 2)
                + Math.pow(y[i] - y[j], 2), 0.5);
            distance[k][1] = Math.abs(t[i] - t[j]);
        }
    }
    distance.sort(function (a, b) {
        return a[0] - b[0];
    });
    variogram.range = distance[(n * n - n) / 2 - 1][0];
    const lags = ((n * n - n) / 2) > 30 ? 30 : (n * n - n) / 2;
    const tolerance = variogram.range / lags;
    const lag = rep(0, lags);
    const semi = rep(0, lags);
    if (lags < 30) {
        for (l = 0; l < lags; l++) {
            lag[l] = distance[l][0];
            semi[l] = distance[l][1];
        }
    } else {
        for (i = 0, j = 0, k = 0, l = 0; i < lags && j < ((n * n - n) / 2); i++, k = 0) {
            while (distance[j][0] <= ((i + 1) * tolerance)) {
                lag[l] += distance[j][0];
                semi[l] += distance[j][1];
                j++;
                k++;
                if (j >= ((n * n - n) / 2))
                    break;
            }
            if (k > 0) {
                lag[l] /= k;
                semi[l] /= k;
                l++;
            }
        }
        if (l < 2)
            return variogram;
    }
    n = l;
    variogram.range = lag[n - 1] - lag[0];
    const X = rep(1, 2 * n);
    const Y = Array(n);
    const A = variogram.A;
    for (i = 0; i < n; i++) {
        switch (model) {
            case 'gaussian':
                X[i * 2 + 1] = 1.0 - Math.exp(-(1.0 / A) * Math.pow(lag[i] / variogram.range, 2));
                break;
            case 'exponential':
                X[i * 2 + 1] = 1.0 - Math.exp(-(1.0 / A) * lag[i] / variogram.range);
                break;
            case 'spherical':
                X[i * 2 + 1] = 1.5 * (lag[i] / variogram.range)
                    - 0.5 * Math.pow(lag[i] / variogram.range, 3);
                break;
        }
        Y[i] = semi[i];
    }
    const Xt = matrixTranspose(X, n, 2);
    let Z = matrixMultiply(Xt, X, 2, n, 2);
    Z = matrixAdd(Z, matrixDiag(1 / alpha, 2), 2, 2);
    const cloneZ = Z.slice(0);
    if (matrixChol(Z, 2)) {
        matrixChol2inv(Z, 2);
    } else {
        matrixSolve(cloneZ, 2);
        Z = cloneZ;
    }
    const W = matrixMultiply(matrixMultiply(Z, Xt, 2, 2, n), Y, 2, n, 1);
    variogram.nugget = W[0];
    variogram.sill = W[1] * variogram.range + variogram.nugget;
    variogram.n = x.length;
    n = x.length;
    let K = Array(n * n);
    for (i = 0; i < n; i++) {
        for (j = 0; j < i; j++) {
            K[i * n + j] = variogram.model(Math.pow(Math.pow(x[i] - x[j], 2)
                + Math.pow(y[i] - y[j], 2), 0.5), variogram.nugget, variogram.range, variogram.sill, variogram.A);
            K[j * n + i] = K[i * n + j];
        }
        K[i * n + i] = variogram.model(0, variogram.nugget, variogram.range, variogram.sill, variogram.A);
    }
    let C = matrixAdd(K, matrixDiag(sigma2, n), n, n);
    let cloneC = C.slice(0);
    if (matrixChol(C, n)) {
        matrixChol2inv(C, n);
    } else {
        matrixSolve(cloneC, n);
        C = cloneC;
    }
    const K1 = C.slice(0);
    const M = matrixMultiply(C, t, n, n, 1);
    variogram.K = K1;
    variogram.M = M;

    return variogram;
}



