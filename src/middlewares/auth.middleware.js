// Step 1: We need to create middleware
function auth(req, res, next) {

    // Step 2: Extract the token
    const token = req.headers.authorization;

    // Step 3: Check if token exists
    if (!token) {
        return res.status(401).json({ msg: "Access denied. Token is required" });
    }

    // Step 4: Verify token
    if (token !== "valid_token") {
        return res.status(401).json({ msg: "Invalid Token. Token does not match" });
    }

    // Step 5: Token verified
    console.log("Token verified Successfully");

    next();
}

module.exports = auth;