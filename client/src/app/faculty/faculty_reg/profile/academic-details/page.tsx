"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { z } from "zod";
import { facultyAcademicDetailsSchema } from "@/schemas/academic-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { identity } from "lodash";
import FormProgress from "@/components/FormProgress";
import { Step } from "@/types/form";
import FormField from "@/components/FormField";
import FormNavigation from "@/components/FormNavigation";
import { FormProvider } from "@/hooks/FormProvider";
import Header from "@/components/ui/header";
import { NavLinks } from "@/components/ui/nav-links";
import axios from "axios";

type Inputs = z.infer<typeof facultyAcademicDetailsSchema>;

const steps: Step[] = [
  {
    id: "Step 1",
    name: "Current Teaching Experience",
    fields: [
      "academicSchema.qualification",
      "academicSchema.aicteFacultyId",
      "academicSchema.department",
      "academicSchema.designation",
      "academicSchema.level",
      "teachingExperienceDrAITSchema.dateOfJoining",
      "teachingExperienceDrAITSchema.designationOnJoining",
      "areaOfSpecializationSchema.subjectsTaught",
      "areaOfSpecializationSchema.program",
      "areaOfSpecializationSchema.noOfTimes",
    ],
  },
  {
    id: "Step 2",
    name: "Previous Teaching Experience",
    fields: [
      "previousTeachingExperienceSchema",
      "teachingExperienceIndustrySchema",
      "teachingExperienceResearchSchema",
    ],
  },
  {
    id: "Step 3",
    name: "Events",
    fields: [
      "eventsAttendedSchema",
      "eventsOrganizedSchema",
      "invitedTalksSchema",
    ],
  },
  {
    id: "Step 4",
    name: "Awards and Recognitions",
    fields: ["awardsSchema", "recognitionsSchema"],
  },
  {
    id: "Step 5",
    name: "Extracurricular Details",
    fields: [
      "responsibilitiesSchema",
      "extracurricularsSchema",
      "outreachSchema",
    ],
  },
  { id: "Step 6", name: "Complete", fields: [] },
];

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(facultyAcademicDetailsSchema),
  });

  const {
    fields: previousTeaching,
    append: appendPreviousTeaching,
    remove: removePreviousTeaching,
  } = useFieldArray({ control, name: "previousTeachingExperienceSchema" });

  const {
    fields: teachingIndustry,
    append: appendTeachingIndustry,
    remove: removeTeachingIndustry,
  } = useFieldArray({ control, name: "teachingExperienceIndustrySchema" });

  const {
    fields: teachingResearch,
    append: appendTeachingResearch,
    remove: removeTeachingResearch,
  } = useFieldArray({ control, name: "teachingExperienceResearchSchema" });

  const {
    fields: eventsAttended,
    append: appendEventsAttended,
    remove: removeEventsAttended,
  } = useFieldArray({ control, name: "eventsAttendedSchema" });

  const {
    fields: eventsOrganized,
    append: appendEventsOrganized,
    remove: removeEventsOrganized,
  } = useFieldArray({ control, name: "eventsOrganizedSchema" });

  const {
    fields: invitedTalks,
    append: appendInvitedTalks,
    remove: removeInvitedTalks,
  } = useFieldArray({ control, name: "invitedTalksSchema" });

  const {
    fields: responsibilities,
    append: appendResponsibilities,
    remove: removeResponsibilities,
  } = useFieldArray({ control, name: "responsibilitiesSchema" });

  const {
    fields: extracurriculars,
    append: appendExtracurriculars,
    remove: removeExtracurriculars,
  } = useFieldArray({ control, name: "extracurricularsSchema" });

  const {
    fields: outreach,
    append: appendOutreach,
    remove: removeOutreach,
  } = useFieldArray({ control, name: "outreachSchema" });

  const {
    fields: recognitions,
    append: appendRecognitions,
    remove: removeRecognitions,
  } = useFieldArray({ control, name: "recognitionsSchema" });

  const {
    fields: awards,
    append: appendAwards,
    remove: removeAwards,
  } = useFieldArray({ control, name: "awardsSchema" });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log("All data", data);
    try {
      const response = await axios.post("/api/facultyacademicdetails", {
        // Include academic schema with default values if not available in your form
        academicSchema: {
          qualification: data.academicSchema.qualification || "Not Specified",
          department: data.academicSchema.department || "Not Specified",
          designation: data.academicSchema.designation || "Not Specified",
          level: data.academicSchema.level || "Not Specified",
        },
        previousTeachingExperienceSchema: data.previousTeachingExperienceSchema || [],
        teachingExperienceIndustrySchema: data.teachingExperienceIndustrySchema || [],
        teachingExperienceResearchSchema: data.teachingExperienceResearchSchema || [],
        eventsAttendedSchema: data.eventsAttendedSchema || [],
        eventsOrganizedSchema: data.eventsOrganizedSchema || [],
        invitedTalksSchema: data.invitedTalksSchema || [],
        responsibilitiesSchema: data.responsibilitiesSchema || [],
        extracurricularsSchema: data.extracurricularsSchema || [],
        outreachSchema: data.outreachSchema || [],
        recognitionsSchema: data.recognitionsSchema || [],
        awardsSchema: data.awardsSchema || [],
      });
      
      if (response.status === 200) {
        console.log(response);
        // Handle success (e.g., show success message, redirect, etc.)
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };
  type FieldName = keyof Inputs;

  const nextButtonFunction = async () => {
    const fields = steps[currentStep].fields;

    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        const allFieldsValid = await trigger();
        console.log("Submitting entire form");
        if (allFieldsValid) {
          console.log("Validation Successfull with all input data");
          await handleSubmit(processForm)();
        } else {
          console.error(
            "Validation Error with all input data with entire schema"
          );
        }
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prevButtonFunction = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div>
      <Header title="Faculty Details" />
      <NavLinks />
    <section className=" flex flex-col justify-between p-24">
      <FormProgress steps={steps} currentStep={currentStep} />

      <FormProvider register={register} errors={errors}>
        <form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Current Teaching Experience
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  label="Qualification"
                  stepsReference="academicSchema.qualification"
                  type="text"
                />

                <FormField
                  label="AICTE Faculty ID"
                  stepsReference="academicSchema.aicteFacultyId"
                  type="text"
                />

                <FormField
                  label="Department"
                  stepsReference="academicSchema.department"
                  type="text"
                />

                <FormField
                  label="Designation"
                  stepsReference="academicSchema.designation"
                  type="text"
                />

                <FormField
                  label="Level"
                  stepsReference="academicSchema.level"
                  type="text"
                />

                <FormField
                  label="Date of Joining"
                  stepsReference="teachingExperienceDrAITSchema.dateOfJoining"
                  type="date"
                />

                <FormField
                  label="Designation on Joining"
                  stepsReference="teachingExperienceDrAITSchema.designationOnJoining"
                  type="text"
                />

                <FormField
                  label="Subjects Taught"
                  stepsReference="areaOfSpecializationSchema.subjectsTaught"
                  type="text"
                />

                <FormField
                  label="Program"
                  stepsReference="areaOfSpecializationSchema.program"
                  type="text"
                />

                <FormField
                  label="No of Times"
                  stepsReference="areaOfSpecializationSchema.noOfTimes"
                  type="number"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Previous Teaching Experience
              </h2>

              {previousTeaching.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                  

                  <FormField
                    label="Name of Institute"
                    stepsReference={`previousTeachingExperienceSchema[${index}].instituteName`}
                    type="text"
                  />

                  <FormField
                    label="From Date"
                    stepsReference={`previousTeachingExperienceSchema[${index}].fromDate`}
                    type="date"
                  />

                  <FormField
                    label="To Date"
                    stepsReference={`previousTeachingExperienceSchema[${index}].toDate`}
                    type="date"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removePreviousTeaching(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  appendPreviousTeaching({

                    instituteName: "",
                    fromDate: new Date(),
                    toDate: new Date(),
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Previous Teaching Experience
              </button>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Industry Teaching Experience
              </h2>

              {teachingIndustry.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                  

                  <FormField
                    label="Organization"
                    stepsReference={`teachingExperienceIndustrySchema[${index}].organization`}
                    type="text"
                  />

                  <FormField
                    label="From Date"
                    stepsReference={`teachingExperienceIndustrySchema[${index}].fromDate`}
                    type="date"
                  />

                  <FormField
                    label="To Date"
                    stepsReference={`teachingExperienceIndustrySchema[${index}].toDate`}
                    type="date"
                  />

                  <FormField
                    label="Designation"
                    stepsReference={`teachingExperienceIndustrySchema[${index}].designation`}
                    type="text"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeTeachingIndustry(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  appendTeachingIndustry({

                    organization: "",
                    fromDate: new Date(),
                    toDate: new Date(),
                    designation: "",
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Industry Teaching Experience
              </button>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Research Teaching Experience
              </h2>

              {teachingResearch.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                  

                  <FormField
                    label="Organization"
                    stepsReference={`teachingExperienceResearchSchema[${index}].organization`}
                    type="text"
                  />

                  <FormField
                    label="From Date"
                    stepsReference={`teachingExperienceResearchSchema[${index}].fromDate`}
                    type="date"
                  />

                  <FormField
                    label="To Date"
                    stepsReference={`teachingExperienceResearchSchema[${index}].toDate`}
                    type="date"
                  />

                  <FormField
                    label="Designation"
                    stepsReference={`teachingExperienceResearchSchema[${index}].designation`}
                    type="text"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeTeachingResearch(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendTeachingResearch({

                    organization: "",
                    fromDate: new Date(),
                    toDate: new Date(),
                    designation: "",
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Research Teaching Experience
              </button>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Events
              </h2>

              {eventsAttended.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                 

                  <FormField
                    label="Type of Event"
                    stepsReference={`eventsAttendedSchema[${index}].typeOfEvent`}
                    type="text"
                  />

                  <FormField
                    label="Title"
                    stepsReference={`eventsAttendedSchema[${index}].title`}
                    type="text"
                  />

                  <FormField
                    label="From Date"
                    stepsReference={`eventsAttendedSchema[${index}].fromDate`}
                    type="date"
                  />

                  <FormField
                    label="To Date"
                    stepsReference={`eventsAttendedSchema[${index}].toDate`}
                    type="date"
                  />

                  <FormField
                    label="Organizer"
                    stepsReference={`eventsAttendedSchema[${index}].organizer`}
                    type="text"
                  />

                  <FormField
                    label="Venue of Event"
                    stepsReference={`eventsAttendedSchema[${index}].venueOfEvent`}
                    type="text"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeEventsAttended(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  appendEventsAttended({

                    typeOfEvent: "",
                    title: "",
                    fromDate: new Date(),
                    toDate: new Date(),
                    organizer: "",
                    venueOfEvent: "",
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Events Attended
              </button>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Events Organized
              </h2>

              {eventsOrganized.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >

                  <FormField
                    label="Type of Event"
                    stepsReference={`eventsOrganizedSchema[${index}].typeOfEvent`}
                    type="text"
                  />

                  <FormField
                    label="Title"
                    stepsReference={`eventsOrganizedSchema[${index}].title`}
                    type="text"
                  />

                  <FormField
                    label="From Date"
                    stepsReference={`eventsOrganizedSchema[${index}].fromDate`}
                    type="date"
                  />

                  <FormField
                    label="To Date"
                    stepsReference={`eventsOrganizedSchema[${index}].toDate`}
                    type="date"
                  />

                  <FormField
                    label="Sponsor"
                    stepsReference={`eventsOrganizedSchema[${index}].sponsor`}
                    type="text"
                  />

                  <FormField
                    label="Venue of Event"
                    stepsReference={`eventsOrganizedSchema[${index}].venueOfEvent`}
                    type="text"
                  />

                  <FormField
                    label="Target Audience"
                    stepsReference={`eventsOrganizedSchema[${index}].targetAudience`}
                    type="text"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeEventsOrganized(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  appendEventsOrganized({

                    typeOfEvent: "",
                    title: "",
                    fromDate: new Date(),
                    toDate: new Date(),
                    sponsor: "",
                    venueOfEvent: "",
                    targetAudience: "",
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Events Organized
              </button>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Invited Talks
              </h2>

              {invitedTalks.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                  

                  <FormField
                    label="Type of Event"
                    stepsReference={`invitedTalksSchema[${index}].typeOfEvent`}
                    type="text"
                  />

                  <FormField
                    label="Title"
                    stepsReference={`invitedTalksSchema[${index}].title`}
                    type="text"
                  />

                  <FormField
                    label="From Date"
                    stepsReference={`invitedTalksSchema[${index}].fromDate`}
                    type="date"
                  />

                  <FormField
                    label="To Date"
                    stepsReference={`invitedTalksSchema[${index}].toDate`}
                    type="date"
                  />

                  <FormField
                    label="Organizer"
                    stepsReference={`invitedTalksSchema[${index}].organizer`}
                    type="text"
                  />

                  <FormField
                    label="Venue of Event"
                    stepsReference={`invitedTalksSchema[${index}].venueOfEvent`}
                    type="text"
                  />

                  <FormField
                    label="Target Audience"
                    stepsReference={`invitedTalksSchema[${index}].targetAudience`}
                    type="text"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeInvitedTalks(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  appendInvitedTalks({

                    typeOfEvent: "",
                    title: "",
                    fromDate: new Date(),
                    toDate: new Date(),
                    organizer: "",
                    venueOfEvent: "",
                    targetAudience: "",
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Invited Talks
              </button>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Awards and Recognitions
              </h2>

              {awards.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >

                  <FormField
                    label="Award"
                    stepsReference={`awardsSchema[${index}].awardRecieved`}
                    type="text"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeAwards(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  appendAwards({

                    awardRecieved: "",
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Awards
              </button>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Recognitions
              </h2>

              {recognitions.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                  
                  <FormField
                    label="Recognition"
                    stepsReference={`recognitionsSchema[${index}].recognitionRecieved`}
                    type="text"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeRecognitions(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendRecognitions({

                    recognitionRecieved: "",
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Recognitions
              </button>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Responsibilities
              </h2>

              {responsibilities.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                

                  <FormField
                    label="Responsibility"
                    stepsReference={`responsibilitiesSchema[${index}].additionalResponsibilitiesHeld`}
                    type="text"
                  />
                  <FormField
                    label="From Date"
                    stepsReference={`responsibilitiesSchema[${index}].fromDate`}
                    type="date"
                  />
                  <FormField
                    label="To Date"
                    stepsReference={`responsibilitiesSchema[${index}].toDate`}
                    type="date"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeResponsibilities(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  appendResponsibilities({

                    additionalResponsibilitiesHeld: "",
                    fromDate: new Date(),
                    toDate: new Date(),
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Responsibilities
              </button>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Extracurriculars
              </h2>

              {extracurriculars.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
    

                  <FormField
                    label="Type of Event"
                    stepsReference={`extracurricularsSchema[${index}].typeOfEvent`}
                    type="text"
                  />

                  <FormField
                    label="Title"
                    stepsReference={`extracurricularsSchema[${index}].titleOfEvent`}
                    type="text"
                  />

                  <FormField
                    label="From Date"
                    stepsReference={`extracurricularsSchema[${index}].fromDate`}
                    type="date"
                  />

                  <FormField
                    label="To Date"
                    stepsReference={`extracurricularsSchema[${index}].toDate`}
                    type="date"
                  />

                  <FormField
                    label="Organizer"
                    stepsReference={`extracurricularsSchema[${index}].organizer`}
                    type="text"
                  />

                  <FormField
                    label="Level"
                    stepsReference={`extracurricularsSchema[${index}].level`}
                    type="text"
                  />

                  <FormField
                    label="Achievement"
                    stepsReference={`extracurricularsSchema[${index}].achievement`}
                    type="text"
                  />

                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeExtracurriculars(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  appendExtracurriculars({

                    typeOfEvent: "",
                    titleOfEvent: "",
                    fromDate: new Date(),
                    toDate: new Date(),
                    organizer: "",
                    level: "",
                    achievement: "",
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Extracurriculars
              </button>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Outreach
              </h2>

              {outreach.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
            

                  <FormField
                    label="Type of Event"
                    stepsReference={`outreachSchema[${index}].activity`}
                    type="text"
                  />

                  <FormField
                    label="Role"
                    stepsReference={`outreachSchema[${index}].role`}
                    type="text"
                  />

                  <FormField
                    label="From Date"
                    stepsReference={`outreachSchema[${index}].fromDate`}
                    type="date"
                  />

                  <FormField
                    label="To Date"
                    stepsReference={`outreachSchema[${index}].toDate`}
                    type="date"
                  />

                  <FormField
                    label="Place"
                    stepsReference={`outreachSchema[${index}].place`}
                    type="text"
                  />

                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeOutreach(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove Button
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  appendOutreach({

                    activity: "",
                    role: "",
                    fromDate: new Date(),
                    toDate: new Date(),
                    place: "",
                  })
                }
                className="text-blue-500 text-sm"
              >
                + Add Outreach
              </button>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Complete
              </h2>
            </motion.div>
          )}
        </form>
      </FormProvider>

      <FormNavigation
        prevButtonFunction={prevButtonFunction}
        steps={steps}
        currentStep={currentStep}
        nextButtonFunction={nextButtonFunction}
      />
    </section>
    </div>
  );
}
