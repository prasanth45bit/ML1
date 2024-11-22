import React, { useState } from 'react';

const TestForm = () => {
  const [label, setLabel] = useState('');
  const [filename, setFilename] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); // State to store image URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    const testData = {
      label: parseFloat(label),
      filename: filename,
      time: parseFloat(time),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (response.ok) {
        const resultData = await response.json();
        setResult(resultData); // Update state with the result
        setImageUrl(`http://127.0.0.1:5000/plots/${filename}.png`); // Set image URL
      } else {
        console.error('Error fetching the test result');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Enter Test Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Label (e.g., 0.5):
          <input
            type="number"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Filename (e.g., file1):
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Time (e.g., 1):
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          <h2>Test Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {imageUrl && (
        <div>
          <h2>Test Plot</h2>
          <img src={imageUrl} alt="Test Plot" width="500" />
        </div>
      )}
    </div>
  );
};

export default TestForm;
