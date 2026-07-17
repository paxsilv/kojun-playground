# Kojun Programming Language
Kojun is an experimental, dynamically typed scripting language, with an interpreter written in Python.

## Expressions

```
12.34 + 137;
1000 - 334;
5 * 99;
10 / 5;
```

## Variables

```
let pi = 3.14159; // constant
var size = 2;     // variable
size = 10;
```

## Functions

```
fun square(x:
    return x * x;
)

square(2 + 5);     // 49
square(square(3)); // 81
```

### Closures

```
fun make_counter(:
    var i = 0;

    fun inner(:
        i += 1;
        return i;
    )

    return inner;
)

let count = make_counter();
count(); // 1
count(); // 2
count(); // 3
```

### Lambdas

```
fun make_counter(next:
    var i = 0;

    fun inner(:
        i = next(i);
        return i;
    )

    return inner;
)

let count = make_counter(fun (x: x + 10));
count(); // 10
count(); // 20
count(); // 30
```

## Control Flow

```
fun abs(x:
    if (x > 0:
        return x;
    ) else if (x < 0:
        return -x;
    ) else (:
        return 0;
    )
)
```

### While loop
```
var i = 0;

while (i < 10:
    display(i);
    newline();
    i += 1;
)
```

## Arrays
```
let empty_array = array(nil, 80);
length(empty_array); // 80
```
```
let numbers = [50, 40, 30, 20, 10];
numbers[1] = 42;

numbers[0] + numbers[1]; // 92
```
