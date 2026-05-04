import Student from './Student';
import './App.css';

function App() {

  const showMessage = () => {
    alert("Button Clicked!");
  };

  return (
    <>
      <h1>🎓 Student Information</h1>

      <button onClick={showMessage}>
        Click Me
      </button>

      <Student name="Tejshree" age="20" course="AI-ML" />
    </>
  );
}

export default App;