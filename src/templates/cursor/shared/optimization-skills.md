---
description: Mandatory Static Language Optimization Rules
globs:
alwaysApply: false
---
## Prefer Early Returns

Use early returns to reduce nesting and improve code readability.

```kotlin
// Bad: Deeply nested conditions
fun processOrder(order: Order?) {
    if (order != null) {
        if (order.items != null) {
            if (order.items.isNotEmpty()) {
                if (order.status == "pending") {
                    // Process order
                }
            }
        }
    }
}

// Good: Flat structure with early returns
fun processOrder(order: Order?) {
    if (order == null) return
    if (order.items.isNullOrEmpty()) return
    if (order.status != "pending") {
        // ...
    }
    // Process order
}
```

## Use Lazy Initialization

Lazy initialization delays computation or resource allocation until actually needed, enhancing performance. Common use cases include:

**Browser Compatibility Checks:** Detect features (e.g., event listeners) on the first call and cache the appropriate function for subsequent calls, avoiding redundant checks.

```kotlin
// Example: Event listener function cached after first call
var addEvent: ((element: Element, type: String, handler: () -> Unit) -> Unit)? = null

fun addEvent(element: Element, type: String, handler: () -> Unit) {
    if (addEvent == null) {
        addEvent = if (/* check for modern event listener support */) {
            { el, t, h -> /* el.addEventListener(t, h) */ }
        } else {
            { el, t, h -> /* fallback for older browsers */ }
        }
    }
    addEvent?.invoke(element, type, handler)
}
```

**Resource Loading:** Delay operations like opening files or loading configurations until they are first accessed.

```go
// Example: Configuration loaded only when GetConfig is first called
var config *Config
func GetConfig() *Config {
  if config == nil {
      config = loadConfigFromFile() // Lazy loading
  }
  return config
}
```

## Always Use Braces for Conditionals/Loops

Never omit braces `{}` for `if` or `while` statements, even for single-line bodies, to prevent potential errors and maintain clarity.

```c
// Bad: Missing braces can lead to unexpected behavior (second goto fail executes unconditionally)
if((err = SSLHashSHA1.update(&hashCtx, &signedParams)) != 0)
  // This goto is conditional
  goto fail;
  // This goto is *not* conditional
  goto fail;
// Good: Braces clearly define the scope
if((err = SSLHashSHA1.update(&hashCtx, &signedParams)) != 0) {
  goto fail;
}
```

## Replace Conditional Logic with Lookups

Transform value-based conditional logic (`if/else if` or `switch`) into table lookups (e.g., using objects or maps) for better readability and often better performance.

```kotlin
// Good: Using a lookup table
val valueAndLabel = mapOf(
    1 to "label1",
    2 to "label2",
    3 to "label3"
)

fun getLabel(value: Int): String? {
    return valueAndLabel[value] // Direct lookup
}

// Bad: Using if/else if
fun getLabelIfElse(value: Int): String? {
    return if (value == 1) {
        "label1"
    } else if (value == 2) {
        "label2"
    } else if (value == 3) {
        "label3"
    } else null
}

// Bad: Using when
fun getLabelWhen(value: Int): String? {
    return when (value) {
        1 -> "label1"
        2 -> "label2"
        3 -> "label3"
        else -> null
    }
}
```

## Avoid Non-Null Assertions

In languages with null safety (like TypeScript, Kotlin, Swift), use non-null assertion operators (`!`) cautiously. Prefer explicit null checks or safe calls (`?.`) to prevent potential runtime errors.

```kotlin
// Bad: Risky non-null assertion
fun processUserAssertion(user: User?) {
    println(user!!.name) // Crashes if user is null
}

// Good: Explicit null check
fun processUserCheck(user: User?) {
    if (user == null) return // Safely handle null case
    println(user.name)
}

// Good: Safe call
fun processUserOptional(user: User?) {
    println(user?.name) // Prints null if user is null, no crash
}
```

## Commenting Guidelines

-   **No End-of-Line Comments:** Avoid placing comments at the end of a code line.
-   **Language:** Use English for library code comments. Use Chinese for business logic comments (including documentation comments).

End-of-line comments reduce code readability, especially in code reviews or diffs, and may introduce CI security risks (e.g., accidental code disabling or leaking sensitive info). Always use standalone comment lines above the code.

## Avoid Unnecessary Object Creation

Reduce object creation, especially in loops or high-frequency code paths, to minimize GC pressure and improve performance.

```java
// Bad: Creating new String in each iteration
for (int i = 0; i < n; i++) {
    String s = new String("example");
}

// Good: Reuse objects when possible
String s = "example";
for (int i = 0; i < n; i++) {
    // Use s
}
```

## Prefer Immutable Data Structures

Favor immutable (final/const/val/readonly) variables and data structures to reduce side effects and improve thread safety.

```kotlin
// Good: Immutable variable
val name = "Alice"

// Bad: Mutable variable
var name = "Alice"
```

## Choose the Right Data Structure

Select the most appropriate data structure for your use case (e.g., Map for lookups, List for ordered access) to optimize performance and readability.

```go
// Good: Use map for fast lookup
userAges := map[string]int{"Alice": 30, "Bob": 25}

// Bad: Linear search in slice
users := []User{...}
for _, u := range users {
    if u.Name == "Alice" { ... }
}
```

## Minimize Type Casting and Boxing/Unboxing

Avoid frequent type casting and boxing/unboxing operations. Prefer primitive types when possible.

```csharp
// Bad: Boxing/unboxing in a loop
object sum = 0;
for (int i = 0; i < 1000; i++) {
    sum = (int)sum + i;
}

// Good: Use primitive type
int sum = 0;
for (int i = 0; i < 1000; i++) {
    sum += i;
}
```

## Leverage Compiler Optimizations

Use keywords like `inline`, `final`, `sealed`, `const` to help the compiler optimize your code.

```kotlin
inline fun log(message: String) { println(message) }

final class MyClass {}
```

## Avoid Reflection and Dynamic Invocation

Reflection and dynamic invocation are flexible but slow. Prefer static, compile-time constructs whenever possible.

```java
// Bad: Using reflection
Method m = obj.getClass().getMethod("foo");
m.invoke(obj);

// Good: Direct method call
obj.foo();
```

## Release Resources Promptly

Always release resources (files, DB connections, locks) as soon as possible. Use language features for automatic management.

```go
// Good: Use defer for automatic resource release
f, err := os.Open("file.txt")
if err != nil { return }
defer f.Close()
```

```java
// Good: try-with-resources
try (InputStream in = new FileInputStream("file.txt")) {
    // ...
}
```

## Minimize Lock Granularity and Avoid Deadlocks

Keep lock scope as small as possible. Use lock-free structures or atomic variables when feasible.

```java
// Good: Minimize lock scope
synchronized(lock) {
    // Only critical section
}
```

## Optimize Loops and Recursion

Avoid redundant calculations inside loops. Use tail recursion optimization if supported.

```kotlin
tailrec fun factorial(n: Int, acc: Int = 1): Int =
    if (n <= 1) acc else factorial(n - 1, acc * n)
```

## Use Static Analysis and Automated Testing

Leverage static analysis tools (e.g., SonarQube, Clippy, Go vet) and maintain high test coverage to catch issues early.

```
# Example: Run static analysis in Go
$ go vet ./...
```

## Handle Exceptions Explicitly

Catch only exceptions you can handle. Let others propagate. Use language-specific error handling idioms.

```rust
// Good: Use Result for error handling
fn read_file() -> Result<String, std::io::Error> {
    std::fs::read_to_string("foo.txt")
}
```

## Layered and Decoupled Code Design

Follow the Single Responsibility Principle. Use dependency injection, interface segregation, and modular design for maintainability and scalability.

```java
// Good: Interface-based design
public interface PaymentService {
    void pay(Order order);
}

public class PaypalPaymentService implements PaymentService {
    public void pay(Order order) { /* ... */ }
}
```
