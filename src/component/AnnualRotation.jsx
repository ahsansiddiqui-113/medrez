import { useState } from "react";
import Layout from "./Layout";
import { useSchedule } from "./context/ScheduleContext";
import { useParams, Link } from "react-router-dom";
import AnnualRotate from "./AnnualRotate"; 

function AnnualRotation() {
    const { annualRotationData } = useSchedule();
    const [selectedTab, setSelectedTab] = useState("Schedule");
    const { year, name } = useParams();

    const hasEntries = annualRotationData && annualRotationData.length > 0;

    return (
        <Layout>
            {hasEntries ? (
                <AnnualRotate />
            ) : (
                <div className="w-[80%] flex flex-col gap-7">
                    <div className="flex justify-between items-center p-4 bg-MedrezLightGray">
                        <h1 className="text-xl font-semibold">Annual Rotation Schedules</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center w-[1000px] h-[100px] absolute top-[300px] left-[309px] gap-[30px] text-center">
                        <p className="text-lg font-bold w-[664px] h-[30px] ">
                            No Schedule Created to edit in Annual Rotation Schedules
                        </p>
                        <p className="text-MedrezGray font-medium">
                            Create a new schedule in Dashboard
                        </p>
                        <Link to="/dashboard">
                            <button className="mt-5 px-6 py-3 bg-MedrezGreen text-black rounded-lg">
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default AnnualRotation;
