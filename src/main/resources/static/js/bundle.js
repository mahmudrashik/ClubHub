(function() {
  // Wait for all dependencies to load
  function initApp() {
    // Check if React, ReactDOM, and App are available
    if (window.React && window.ReactDOM && typeof App !== 'undefined') {
      const rootElement = document.getElementById('root');
      if (rootElement) {
        try {
          // Create React root and render the app
          const root = window.ReactDOM.createRoot ? 
            window.ReactDOM.createRoot(rootElement) : 
            { render: (element) => window.ReactDOM.render(element, rootElement) };
          
          const appElement = window.React.createElement(App.default || App);
          
          if (root.render) {
            root.render(appElement);
          } else {
            window.ReactDOM.render(appElement, rootElement);
          }
          
          console.log('ClubHub React app mounted successfully!');
        } catch (error) {
          console.error('Error mounting React app:', error);
        }
      }
    } else {
      // Wait a bit more for dependencies to load
      setTimeout(initApp, 100);
    }
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();