var run = require(__dirname + "/../lib/server").run,
    config = require(__dirname + "/../lib/server").config;

beforeEach(function(){
  this.addMatchers({
    toBeAFunction: function() {
      return (typeof this.actual === "function");
    }
  });
});

describe("run", function(){

  it("should be defined", function(){
    expect(run).toBeDefined();
  });

  it("should be a function", function(){
    expect(run).toBeAFunction();
  });

});

describe("config defaults", function(){

  it("should have the correct default port", function(){
    expect(config.port).toBe(8000);
  });

  it("should have the correct default directory", function(){
    expect(config.directory).toBe(__dirname.replace('/spec', ''));
  });

  it("should default colors to true", function(){
    expect(config.colors).toBe(true);
  });

  it("should default nologs to false", function(){
    expect(config.nologs).toBe(false);
  })

});

describe("getMimeType", function(){

  it("should be defined", function(){
    expect(getMimeType).toBeDefined();
  });

  it("should be a function", function(){
    expect(getMimeType).toBeAFunction();
  });

  it("should return the correct mime types", function(){
    expect(getMimeType("this/is/a/test.html")).toBe("text/html");
    expect(getMimeType("testing-javascript.js")).toBe("application/javascript");
    expect(getMimeType("sample Image - hello.png")).toBe("image/png");
    expect(getMimeType("test.JPG")).toBe("image/jpeg");
    expect(getMimeType("TEST.jPEG")).toBe("image/jpeg");
  });

});
