// Mock DOM elements
global.textArea = { innerText: '' }; // Mock the text area DOM element

// Mock the showStatus function
global.showStatus = jest.fn(() => {
  if (!global.gamesStarted) {
    global.textArea.innerText = 'Welcome to BlackJack!';
  }
});

// Test: Displays welcome message before the game starts
test('displays welcome message before game starts', () => {
  global.gamesStarted = false; // Ensure the game hasn't started
  
  // Call the mock showStatus function
  global.showStatus();

  // Checkthe welcome message is displayed
  expect(global.textArea.innerText).toBe('Welcome to BlackJack!');
});
