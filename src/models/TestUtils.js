const TestUtils = {
    url: typeof process.env.JWT_SECRET !== "undefined" 
        ? "http://localhost:8080/#" 
        : "https://kryman.me/#"
    ,        
}

module.exports = TestUtils;
