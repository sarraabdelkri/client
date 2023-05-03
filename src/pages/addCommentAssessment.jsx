import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ViewAssessment } from "../../../client/src/components/assessments/allAssessments/viewAssessment";

export function AddComment() {
  const navigate = useNavigate();

  const checkUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppLayout>
      <AppLayout.Header>Assessment</AppLayout.Header>
      <AppLayout.Content>
        <ViewAssessment />
      </AppLayout.Content>
    </AppLayout>
  );
}

export default AddComment;
