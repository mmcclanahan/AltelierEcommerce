import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList.jsx';
import axios from 'axios';
import Search from './Search.jsx';
import AddQuestion from './AddQuestion.jsx';

const QandA = ({ product, server, options }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [searchInput, setSearchInput] = useState('');

  const updateSearch = (input) => {
    setSearchInput(input);
  };

  const fetchQuestionsAndAnswers =() =>{
    if (product.id) {
      axios.get(`${server}/qa/questions?product_id=${product.id}&page=1&count=50`, options)
        .then((response) => {
          const fetchedQuestions = response.data.results;
          setQuestions(fetchedQuestions);
          fetchedQuestions.forEach(question => {
            axios.get(`${server}/qa/questions/${question.question_id}/answers`, options)
              .then((answersResponse) => {
                setAnswers(prevAnswers => ({
                  ...prevAnswers,
                  [question.question_id]: answersResponse.data.results
                }));
              })
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    fetchQuestionsAndAnswers();
  }, [product]);

  const handleQuestionSubmit = (questionData) => {
    // axios.post(`${server}/qa/questions`, questionData, options)
    axios.post(`${server}/qa/questions?product_id=${product.id}`, questionData, options)
      .then(() => {
        console.log('Question added successfully:', questionData);
        fetchQuestionsAndAnswers();
        })
      .catch(error => console.error('Error adding question:', error));
  };

  const filteredQuestions = questions.filter(question =>
    question.question_body.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <h4>Questions & Answers</h4>
      <nav><Search onSearchChange={updateSearch}/></nav>
      <QuestionList server={server} options={options} product={product} questions={searchInput.length >= 3 ? filteredQuestions : questions} answers={answers} />
      <AddQuestion productId = {product.id} productName={product.name} onSubmitQuestion={handleQuestionSubmit}/>
    </div>
  );
};

export default QandA;
