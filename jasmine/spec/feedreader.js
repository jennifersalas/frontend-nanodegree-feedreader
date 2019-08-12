/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('URLs are defined', function() {
      allFeeds.forEach(feed => {
        expect(feed.url).toBeDefined();
        expect(feed.length).not.toBe(0);
      });
    });


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('names are defined', function() {
      allFeeds.forEach(feed => {
        expect(feed.name).toBeDefined();
        expect(feed.length).not.toBe(0);
      })
    });

  });


  describe('The menu', function() {
    var body = document.querySelector('body');
    var menuIcon = document.querySelector('.icon-list');

    /* Test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden', function() {
      expect(body.classList.contains("menu-hidden")).toBe(true);
    });

    /* Test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility', function() {
      body.classList.add("menu-hidden"); // set menu to hidden
      menuIcon.click();
      expect(body.classList.contains("menu-hidden")).toBe(false);
      menuIcon.click();
      expect(body.classList.contains("menu-hidden")).toBe(true);
    });
  });


  describe("Initial Entries", function() {
    var feed = document.querySelector('.feed'),
      singleEntry;

    beforeEach(function(done) {
      singleEntry = feed.querySelector('.entry');
      loadFeed(1, done);
    });

    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it("completes its work", function(done) {
      expect(singleEntry).toBeDefined();
      done();
    });
  });


  describe("New Feed Selection", function() {
    var previousFeed;
    var feedObject = document.querySelector(".feed");

    beforeEach(function(done) {
      loadFeed(0, function() { // first feed should be Udacity Blog
        previousFeed = feedObject.innerHTML;
        loadFeed(1, done); // second feed should be CSS Tricks
      });
    })


    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    it("is different", function(done) {
      expect(feedObject.innerHTML).not.toBe(previousFeed);
      done();
    })
  });

}());
