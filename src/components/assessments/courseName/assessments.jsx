import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Assessment from "./assessment";
import { toast } from "react-toastify";
import axios from "axios";
import { AppLayout } from "@/widgets/layout";
import { Card, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
export function AssessmentsList() {
  const { courseName } = useParams();
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const getAssessmentsByCourseName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/assessment/getAssessmentsByCourseName/${courseName}`
        );
        setAssessments(response.data.assessments);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching assessments.", {
          autoClose: 3000,
        });
      }
    };
    getAssessmentsByCourseName();
  }, [courseName]);

  if (!assessments) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <AppLayout>
        <AppLayout.Header>Quizz</AppLayout.Header>
        <AppLayout.Content>
          <Container >
            <Row >
            <div className="h-full  px-6 pb-10 pt-4 mt-9">
              {assessments.map((assessment, i) => {
                return (
                  <div className="mb-3" key={i}>
                    <Assessment assessment={assessment} />
                  </div>
                );
              })}
            </div>
            </Row>
          </Container>
        </AppLayout.Content>
      </AppLayout>
    </>
  );
}

export default AssessmentsList;
