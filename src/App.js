import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import { Container, Content, Row } from "./styles";

function App() {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [firstNumber, setFirstNumber] = useState("0");
  const [operation, setOperation] = useState("");

  const handleOnClear = () => {
    setCurrentNumber("0");
    setFirstNumber("0");
    setOperation("");
  };

  const handleAddNumber = (num) => {
    setCurrentNumber((prev) => {
      // evita dois pontos decimais
      if (num === "." && prev.includes(".")) return prev;
      return `${prev === "0" && num !== "." ? "" : prev}${num}`;
    });
  };

  // Função genérica para calcular
  const calculate = (op, a, b) => {
    const x = Number(a);
    const y = Number(b);
    switch (op) {
      case "+": return String(x + y);
      case "-": return String(x - y);
      case "x": return String(x * y);
      case "/": return y !== 0 ? String(x / y) : "Erro";
      default:  return b;
    }
  };

  const handleSetOperation = (op) => {
    if (currentNumber === "0" && firstNumber === "0") return;

    if (operation === "") {
      // Primeira operação: só define o primeiro número
      setFirstNumber(currentNumber);
      setCurrentNumber("0");
      setOperation(op);
    } else {
      // Já existe operação: calcula antes de definir a próxima
      const result = calculate(operation, firstNumber, currentNumber);
      setCurrentNumber(result);
      setFirstNumber(result);
      setOperation(op);
    }
  };

  const handleEquals = () => {
    if (firstNumber !== "0" && operation !== "" && currentNumber !== "0") {
      const result = calculate(operation, firstNumber, currentNumber);
      setCurrentNumber(result);
      setFirstNumber("0");
      setOperation("");
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />

        <Row>
          <Button label="x" onClick={() => handleSetOperation("x")} />
          <Button label="/" onClick={() => handleSetOperation("/")} />
          <Button label="c" onClick={handleOnClear} />
          <Button label="." onClick={() => handleAddNumber(".")} />
        </Row>

        <Row>
          <Button label="7" onClick={() => handleAddNumber("7")} />
          <Button label="8" onClick={() => handleAddNumber("8")} />
          <Button label="9" onClick={() => handleAddNumber("9")} />
          <Button label="-" onClick={() => handleSetOperation("-")} />
        </Row>

        <Row>
          <Button label="4" onClick={() => handleAddNumber("4")} />
          <Button label="5" onClick={() => handleAddNumber("5")} />
          <Button label="6" onClick={() => handleAddNumber("6")} />
          <Button label="+" onClick={() => handleSetOperation("+")} />
        </Row>

        <Row>
          <Button label="1" onClick={() => handleAddNumber("1")} />
          <Button label="2" onClick={() => handleAddNumber("2")} />
          <Button label="3" onClick={() => handleAddNumber("3")} />
          <Button label="=" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
}

export default App;
