const fg = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magneta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
}

const other = {
    rest: '\x1b[0m',
    invert: '\x1b[7m',
    revert: '\x1b[27m',
}

export const colors = {
    ...fg,
    ...other,
}
