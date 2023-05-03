import { AppLayout } from "@/widgets/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  UserCircleIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Card } from "react-bootstrap";
import profilepic from "../../../client/public/css/profile.css";
import { useRef } from "react";
import courseStore from "@/store/courseStore";
const staticSkills = ["React", "JavaScript", "HTML", "CSS", "Node.js"];
const staticexperience = [
  {
    title: "Frontend Developer",
    company: "Focus",
    location: "New York, NY",
    startDate: "2018-01-01",
    endDate: "2021-05-01",
    description: "React developer",
  },
];
export function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [skills, setSkills] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [results, setResults] = useState([]);
  const [duration, setDuration] = useState();
  const [totalduration, setTotalduration] = useState();

  const [experience, setExperience] = useState([]);
  const [user1, setUser1] = useState({});
  const id = localStorage.getItem("id");
  const userId = localStorage.getItem("id");
  console.log("userId", userId);
  const getLastSessionDuration = courseStore((state) => state.getLastSessionDuration);
  const getSessionDurations = courseStore((state) => state.getSessionDurations);
  const [profilePicture, setProfilePicture] = useState("");
  const fileInput = useRef(null);
  const [rand, setRand] = useState(0);


  const handleClick = () => {
    fileInput.current.click();
    setRand(Math.random());
  };
  const prepareDate = () => {
    const date = new Date(user?.createdAt);
    // format to DD month YYYY
    const createdAt = `${date.getDate()} ${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getFullYear()}`;
    setCreatedAt(createdAt);
  };

  const checkUser = () => {
    if (!user) {
      navigate("/sign-in");
    }
  };

  const getScore = (result) => {
    let len = result.answers.length;
    let right = result.answers.filter((ans) => ans === true);
    return 100 * (right.length / len) + "%";
  };
  const displaysessionduration = async () => {
    const res = await getLastSessionDuration(userId)
    setDuration(res)
  }
  const displaysessiondurations = async () => {
    const res = await getSessionDurations(userId)
    setTotalduration(res)
  }
  useEffect(() => {
    console.log('duration:', duration);
  }, [duration]);
  useEffect(() => {
    checkUser();
    prepareDate();
    fetchUserData();
    displaysessionduration()
    displaysessiondurations()
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/");
    } else {
      axios
        .get(
          "http://localhost:9000/result/getResultsAndAssessmentsByUserId/" + id
        )
        .then((res) => {
          setResults(res.data.data.map((result) => result.result));
          setAssessments(res.data.data.map((result) => result.assessment));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setSkills(staticSkills);
    setExperience(staticexperience);
  }, []);
  function handleSelectFile(e) {
    console.log(e.target.files);
    setProfilePicture(e.target.files[0]);

  }

  const uploadPicture = async (event) => {
    try {
      event.preventDefault();
      const profilePictureInput = document.getElementById(
        "profilePictureInput"
      );
      const profilePicture = profilePictureInput.files[0];
      console.log(profilePictureInput.files[0]); // a
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);

      const response = await axios.post(
        `http://localhost:9000/user/profile-picture/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfilePicture(response.data.profilePicture);

      console.log(profilePicture);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserData = async () => {
    try {
      const urll = `http://localhost:9000/user/fetch/${id}`;

      const response = await axios.get(urll);
      setUser1(response.data.user);
      console.log("hhhhh", urll);
      setUser1(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AppLayout>
      <AppLayout.Header>Profile</AppLayout.Header>
      <AppLayout.Content>
        <div className="flex h-full flex-col items-center px-4 pt-10">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="col-span-1 mr-5 flex flex-col items-center">
              <div className="mr-6 flex flex-col ">
                <div class="profilepic">
                  <img
                    src={`http://localhost:9000/user/fetch/${userId}`}
                    width="150"
                    height="150"
                    alt="Profibild"
                  />
                  <div onClick={handleClick} className="profilepic__content">
                    <span className="profilepic__icon">
                      <i className="fas fa-camera"></i>
                    </span>
                    <span className="profilepic__text">Edit Profile</span>
                    <input
                      type="file"
                      id="profilePictureInput"
                      accept="image/*"
                      onChange={uploadPicture}
                      ref={fileInput}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <h1
                  className="mr-3 text-2xl font-bold text-gray-800"
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: "normal",
                    fontFamily: "sans-serif",
                  }}
                >
                  {user.name}
                </h1>
              </div>
            </div>
            <div className="col-span-1">
              <Link to="/settings">
                {" "}
                <Cog6ToothIcon className="text-grey-500 float-right h-6 w-6" />
              </Link>
              <div className="flex items-center">
                <CheckCircleIcon className="mr-2 h-6 w-6 text-green-500" />
                <h1 className="text-xl font-bold tracking-widest text-gray-800">
                  Verified
                </h1>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 pt-1">Account created on {createdAt}</p> <br />
                <p style={{ color: "#0E5605" }} className="text-sm font-medium">Last session duration: {Math.round(duration / 60)} minutes</p>
                <p style={{ color: "#0E5605" }} className="text-sm font-medium pt-2">Total platform activity: {Math.round(totalduration / 60)} minutes</p>
              </div>

              <div className="mt-4">
                <div className="mt-4">
                  <h1
                    className="text-xl font-bold tracking-widest text-gray-800"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "normal",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Skills
                  </h1>
                  <div className="mt-3 flex flex-wrap ">
                    {results.map((result, index) => {
                      const assessment = assessments.find(
                        (a) => a._id === result.assessmentId
                      );

                      if (assessment && parseFloat(getScore(result)) > 50) {
                        return (
                          <div
                            key={index}
                            className="ml-2 flex items-center rounded-lg bg-green-500 px-2 py-1 text-xs font-bold text-white"
                          >
                            {assessment.name}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col items-center px-4 pt-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <h1
                  className=" text-xl font-bold text-gray-800"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "normal",
                    fontFamily: "sans-serif",
                  }}
                >
                  Contact information
                </h1>
                <div className="mt-4">
                  <h1
                    className="text-lg text-gray-600"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "normal",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {user.email}
                  </h1>
                  <h1
                    className="text-lg text-gray-600"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "normal",
                      fontFamily: "sans-serif",
                    }}
                  >
                    26399046
                  </h1>
                  <h1
                    className="text-lg font-bold tracking-widest text-gray-600"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "normal",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Tunisia , Tunis
                  </h1>
                </div>
              </div>
              <div className="col-span-1">
                <h1
                  className="text-xl font-bold tracking-widest text-gray-800"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "normal",
                    fontFamily: "sans-serif",
                  }}
                >
                  Work experience
                </h1>
                <div className="mt-4">
                  {experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h1
                        className="text-lg font-bold tracking-widest text-gray-800"
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: "normal",
                          fontFamily: "sans-serif",
                        }}
                      >
                        {exp.title}
                      </h1>
                      <h1 className="text-md text-gray-600">
                        {exp.company}, {exp.city}
                      </h1>
                      <p className="mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
                <Link to={`/pdfContract`}>
                  <Button variant="outlined" color="success">Download Your Contract  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AppLayout.Content>
    </AppLayout>
  );
}
export default Profile;