import React, { useState } from "react";

function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    // Validation
    if (!loanAmount || !annualRate || !loanTenure) {
      alert("Please fill out all fields.");
      return;
    }
    if (loanAmount <= 0 || annualRate <= 0 || loanTenure <= 0) {
      alert("Please enter positive values.");
      return;
    }

    // EMI Calculation
    const P = parseFloat(loanAmount);
    const R = parseFloat(annualRate) / 12 / 100; // monthly interest rate
    const N = parseInt(loanTenure);

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emiValue * N;
    const totalInterestValue = totalAmount - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
  };

  return (
    <div style={styles.container}>
      <h2>EMI Calculator</h2>

      <div style={styles.inputGroup}>
        <label>Loan Amount (₹): </label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter loan amount"
        />
      </div>

      <div style={styles.inputGroup}>
        <label>Annual Interest Rate (%): </label>
        <input
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(e.target.value)}
          placeholder="Enter interest rate"
        />
      </div>

      <div style={styles.inputGroup}>
        <label>Loan Tenure (months): </label>
        <input
          type="number"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
          placeholder="Enter loan tenure"
        />
      </div>

      <button style={styles.button} onClick={calculateEMI}>
        Calculate EMI
      </button>

      {emi && (
        <div style={styles.results}>
          <h3>Results:</h3>
          <p><strong>Loan Amount:</strong> ₹{loanAmount}</p>
          <p><strong>Monthly EMI:</strong> ₹{emi}</p>
          <p><strong>Total Interest Payable:</strong> ₹{totalInterest}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif"
  },
  inputGroup: {
    margin: "15px 0",
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  results: {
    marginTop: "20px",
    textAlign: "left",
    backgroundColor: "#f8f8f8",
    padding: "10px",
    borderRadius: "8px"
  }
};

export default EMICalculator;
