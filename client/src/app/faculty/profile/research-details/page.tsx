// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";

// import { z } from "zod";
// import { facultyResearchDetailsSchema } from "@/schemas/research-details";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
// import { identity } from "lodash";
// import FormProgress from "@/components/FormProgress";
// import { Step } from "@/types/form";
// import FormField from "@/components/FormField";
// import FormNavigation from "@/components/FormNavigation";
// import { FormProvider } from "@/hooks/FormProvider";
// import Header from "@/components/ui/header";
// import { NavLinks } from "@/components/faculty/ui/nav-links";

// type Inputs = z.infer<typeof facultyResearchDetailsSchema>;

// const steps: Step[] = [
//   {
//     id: "Step 1",
//     name: "Faculty Research Details",
//     fields: [
//       "facultyResearchSchema.vtuFacultyId",
//       "facultyResearchSchema.aicteFacultyId",
//       "facultyResearchSchema.orcId",
//       "facultyResearchSchema.scopusId",
//       "facultyResearchSchema.publonsAndWebOfScienceId",
//     ],
//   },
//   {
//     id: "Step 2",
//     name: "National and International Journal",
//     fields: [
//       "nationalJournalDetailsSchema",
//       "internationalJournalDetailsSchema",
//     ],
//   },
//   {
//     id: "Step 3",
//     name: "National and International Conference",
//     fields: [
//       "nationalConferenceDetailsSchema",
//       "internationalConferenceDetailsSchema",
//     ],
//   },
//   {
//     id: "Step 4",
//     name: "Research and Consultancy",
//     fields: ["researchGrantsSchema", "consultancySchema"],
//   },
//   {
//     id: "Step 5",
//     name: "Patents Details",
//     fields: ["patentsSchema"],
//   },
//   {
//     id: "Step 6",
//     name: "Research Scholar Details",
//     fields: ["researchScholarDetailsSchema"],
//   },
//   { id: "Step 7", name: "Complete", fields: [] },
// ];

// export default function Form() {
//   const [previousStep, setPreviousStep] = useState(0);
//   const [currentStep, setCurrentStep] = useState(0);
//   const delta = currentStep - previousStep;

//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     trigger,
//     setValue,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(facultyResearchDetailsSchema),
//     defaultValues: {
//       facultyResearchSchema: {
//         vtuFacultyId: "FAC67890",
//         aicteFacultyId: "AICTE1234",
//         orcId: "ORCID12345678",
//         scopusId: "SCOPUS87654",
//         publonsAndWebOfScienceId: "PUBLONS9876",
//       },
//       nationalJournalDetailsSchema: [
//         { nameOfJournal: "National Journal 1", yearOfPublication: "2020", titleOfResearchPaper: "Paper 1" },
//       ],
//       internationalJournalDetailsSchema: [
//         { nameOfJournal: "International Journal 1", yearOfPublication: "2021", titleOfResearchPaper: "Paper 2" },
//       ],
//       nationalConferenceDetailsSchema: [
//         { slNo: "1", titleOfResearchPaper: "Research Paper Title", nameOfJournal: "National Conference 2021", volume: "1", issueNo: "1", yearOfPublication: "2021", pageNoFrom: "1", pageNoTo: "10", author01: "Author 1", author02: "Author 2", author03: "Author 3", author04: "Author 4", publishedUnder: "Web of Science", impactFactor: "1.0" },
//       ],
//       internationalConferenceDetailsSchema: [
//         { slNo: "1", titleOfResearchPaper: "Research Paper Title", nameOfJournal: "International Conference 2022", volume: "1", issueNo: "1", yearOfPublication: "2022", pageNoFrom: "1", pageNoTo: "10", author01: "Author 1", author02: "Author 2", author03: "Author 3", author04: "Author 4", publishedUnder: "Web of Science", impactFactor: "1.0" },
//       ],
//       researchGrantsSchema: [
//         { titleOfProject: "Grant 1", sanctionedAmount: "100000", sanctionedDate: new Date("2021-01-01") },
//       ],
//       consultancySchema: [
//         { slNo: "1", timePeriodOfProject: "1", sanctionedDate: new Date("2022-01-01"), sanctionedAmount: "50000", fundedBy: "Agency", principalInvestigatorDesignation: "PI Designation", principalInvestigatorInstitute: "PI Institute", coPrincipalInvestigatorDesignation: "Co-PI Designation", coPrincipalInvestigatorInstitute: "Co-PI Institute", status: "Ongoing" },
//       ],
//       patentsSchema: [
//         { titleOfResearchPatent: "Patent 1", patentGrantedYear: "2020" },
//       ],
//       researchScholarDetailsSchema: [
//         { nameOfResearchScholar: "Scholar 1" },
//       ],
//     },
//   });
//   const {
//     fields: nationalJournal,
//     append: appendNationalJournal,
//     remove: removeNationalJournal,
//   } = useFieldArray({ control, name: "nationalJournalDetailsSchema" });

//   const {
//     fields: internationalJournal,
//     append: appendInternationalJournal,
//     remove: removeInternationalJournal,
//   } = useFieldArray({ control, name: "internationalJournalDetailsSchema" });

//   const {
//     fields: nationalConference,
//     append: appendNationalConference,
//     remove: removeNationalConference,
//   } = useFieldArray({ control, name: "nationalConferenceDetailsSchema" });

//   const {
//     fields: internationalConference,
//     append: appendInternationalConference,
//     remove: removeInternationalConference,
//   } = useFieldArray({ control, name: "internationalConferenceDetailsSchema" });

//   const {
//     fields: researchGrants,
//     append: appendResearchGrants,
//     remove: removeResearchGrants,
//   } = useFieldArray({ control, name: "researchGrantsSchema" });

//   const {
//     fields: consultancy,
//     append: appendConsultancy,
//     remove: removeConsultancy,
//   } = useFieldArray({ control, name: "consultancySchema" });

//   const {
//     fields: patents,
//     append: appendPatents,
//     remove: removePatents,
//   } = useFieldArray({ control, name: "patentsSchema" });

//   const {
//     fields: researchScholar,
//     append: appendResearchScholar,
//     remove: removeResearchScholar,
//   } = useFieldArray({ control, name: "researchScholarDetailsSchema" });

//   const processForm: SubmitHandler<Inputs> = (data) => {
//     console.log(data);
//     reset();
//   };

//   type FieldName = keyof Inputs;

//   const nextButtonFunction = async () => {
//     const fields = steps[currentStep].fields;

//     const output = await trigger(fields as FieldName[], { shouldFocus: true });

//     if (!output) return;

//     if (currentStep < steps.length - 1) {
//       if (currentStep === steps.length - 2) {
//         const allFieldsValid = await trigger();
//         console.log("Submitting entire form");
//         if (allFieldsValid) {
//           console.log("Validation Successfull with all input data");
//           await handleSubmit(processForm)();
//         } else {
//           console.error(
//             "Validation Error with all input data with entire schema"
//           );
//         }
//       }
//       setPreviousStep(currentStep);
//       setCurrentStep((step) => step + 1);
//     }
//   };

//   const prevButtonFunction = () => {
//     if (currentStep > 0) {
//       setPreviousStep(currentStep);
//       setCurrentStep((step) => step - 1);
//     }
//   };

//   const handleStepClick = async (index: number) => {
//     if (index <= currentStep) {
//       // Allow navigating to any step before or equal to the current step
//       setPreviousStep(currentStep);
//       setCurrentStep(index);
//     } else {
//       // For future steps, validate the current step before allowing navigation
//       const fieldsToValidate = steps[currentStep].fields as FieldName[];
  
//       const isValid = await trigger(fieldsToValidate, { shouldFocus: true });
      
//       if (isValid) {
//         setPreviousStep(currentStep);
//         setCurrentStep(index);
//       } else {
//         console.error("Please fix the validation errors before moving ahead.");
//       }
//     }
//   };
  
//   return (
//     <div>
//       <Header title="Faculty Details" />
//       <NavLinks />
    
//     <section className=" flex flex-col justify-between p-24">
//       <FormProgress steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
//       <FormProvider register={register} errors={errors}>
//         <form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
//         {currentStep === 0 && (
//   <motion.div
//     initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     transition={{ duration: 0.3, ease: "easeInOut" }}
//   >
//     <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//       Faculty Research Details
//     </h2>

//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           VTU Faculty ID
//         </label>
//         <p className="mt-1 text-gray-900">{watch("facultyResearchSchema.vtuFacultyId")}</p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           AICTE Faculty ID
//         </label>
//         <p className="mt-1 text-gray-900">{watch("facultyResearchSchema.aicteFacultyId")}</p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           ORC ID
//         </label>
//         <p className="mt-1 text-gray-900">{watch("facultyResearchSchema.orcId")}</p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Scopus ID
//         </label>
//         <p className="mt-1 text-gray-900">{watch("facultyResearchSchema.scopusId")}</p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Publons ID
//         </label>
//         <p className="mt-1 text-gray-900">{watch("facultyResearchSchema.publonsAndWebOfScienceId")}</p>
//       </div>
//     </div>
//   </motion.div>
// )}


//           {currentStep === 1 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 National Journal Details
//               </h2>

//               {nationalJournal.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//                 >
//                   <FormField
//                     label="Sl.No"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].slNo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Title Of Research Paper"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].titleOfResearchPaper`}
//                     type="text" 
//                   />

//                   <FormField
//                     label="Name Of Journal"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].nameOfJournal`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Volume"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].volume`}
//                     type="text"
//                   />

//                   <FormField
//                     label="issueNo"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].issueNo`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Year Of Publication"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].yearOfPublication`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Page No From"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].pageNoFrom`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Page No To"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].pageNoTo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Author 01"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].author01`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 02"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].author02`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 03"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].author03`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 04"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].author04`}
//                     type="text"
//                   />

//                   <div>
//                     <label
//                       htmlFor="publishedUnder"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Published Under
//                     </label>
//                     <select
//                       id="publishedUnder"
//                       {...register(
//                         `nationalJournalDetailsSchema.${index}.publishedUnder`
//                       )}
//                       className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option value="Web of Science">Web of Science</option>
//                       <option value="Scopus">Scopus</option>
//                       <option value="Q1">Q1</option>
//                       <option value="Q2">Q2</option>
//                       <option value="Q3">Q3</option>
//                     </select>
//                     {errors.nationalJournalDetailsSchema?.[index]
//                       ?.publishedUnder && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {
//                           errors.nationalJournalDetailsSchema[index]
//                             .publishedUnder.message
//                         }
//                       </p>
//                     )}
//                   </div>

//                   <FormField
//                     label="Impact Factor"
//                     stepsReference={`nationalJournalDetailsSchema[${index}].impactFactor`}
//                     type="number"
//                   />
//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => removeNationalJournal(index)}
//                       className="text-red-500 text-sm"
//                     >
//                       Remove Button
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={() =>
//                   appendNationalJournal({
//                     slNo: "",
//                     titleOfResearchPaper: "",
//                     nameOfJournal: "",
//                     volume: "",
//                     issueNo: "",
//                     yearOfPublication: "",
//                     pageNoFrom: "",
//                     pageNoTo: "",
//                     author01: "",
//                     author02: "",
//                     author03: "",
//                     author04: "",
//                     publishedUnder: "Web of Science",
//                     impactFactor: "",
//                   })
//                 }
//                 className="text-blue-500 text-sm"
//               >
//                 + Add a National Journal Publication
//               </button>

//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 International Journal Details
//               </h2>

//               {internationalJournal.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//                 >
//                   <FormField
//                     label="Sl.No"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].slNo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Title Of Research Paper"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].titleOfResearchPaper`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Name Of Journal"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].nameOfJournal`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Volume"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].volume`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Issue No"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].issueNo`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Year Of Publication"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].yearOfPublication`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Page No From"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].pageNoFrom`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Page No To"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].pageNoTo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Author 01"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].author01`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 02"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].author02`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 03"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].author03`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 04"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].author04`}
//                     type="text"
//                   />

//                   <div>
//                     <label
//                       htmlFor="publishedUnder"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Published Under
//                     </label>
//                     <select
//                       id="publishedUnder"
//                       {...register(
//                         `internationalJournalDetailsSchema.${index}.publishedUnder`
//                       )}
//                       className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option value="Web of Science">Web of Science</option>
//                       <option value="Scopus">Scopus</option>
//                       <option value="Q1">Q1</option>
//                       <option value="Q2">Q2</option>
//                       <option value="Q3">Q3</option>
//                       <option value="SCI">SCI</option>
//                     </select>
//                     {errors.internationalJournalDetailsSchema?.[index]
//                       ?.publishedUnder && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {
//                           errors.internationalJournalDetailsSchema[index]
//                             .publishedUnder.message
//                         }
//                       </p>
//                     )}
//                   </div>

//                   <FormField
//                     label="Impact Factor"
//                     stepsReference={`internationalJournalDetailsSchema[${index}].impactFactor`}
//                     type="number"
//                   />

//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => removeInternationalJournal(index)}
//                       className="text-red-500 text-sm"
//                     >
//                       Remove Button
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() =>
//                   appendInternationalJournal({
//                     slNo: "",
//                     titleOfResearchPaper: "",
//                     nameOfJournal: "",
//                     volume: "",
//                     issueNo: "",
//                     yearOfPublication: "",
//                     pageNoFrom: "",
//                     pageNoTo: "",
//                     author01: "",
//                     author02: "",
//                     author03: "",
//                     author04: "",
//                     publishedUnder: "Web of Science",
//                     impactFactor: "",
//                   })
//                 }
//                 className="text-blue-500 text-sm"
//               >
//                 + Add an International Journal Publication
//               </button>
//             </motion.div>
//           )}

//           {currentStep === 2 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 National Conference Details
//               </h2>

//               {nationalConference.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//                 >
//                   <FormField
//                     label="Sl.No"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].slNo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Title Of Research Paper"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].titleOfResearchPaper`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Name Of Journal"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].nameOfJournal`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Volume"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].volume`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Issue No"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].issueNo`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Year Of Publication"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].yearOfPublication`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Page No From"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].pageNoFrom`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Page No To"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].pageNoTo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Author 01"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].author01`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 02"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].author02`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 03"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].author03`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 04"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].author04`}
//                     type="text"
//                   />

//                   <div>
//                     <label
//                       htmlFor="publishedUnder"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Published Under
//                     </label>
//                     <select
//                       id="publishedUnder"
//                       {...register(
//                         `nationalConferenceDetailsSchema.${index}.publishedUnder`
//                       )}
//                       className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option value="Web of Science">Web of Science</option>
//                       <option value="Scopus">Scopus</option>
//                       <option value="Q1">Q1</option>
//                       <option value="Q2">Q2</option>
//                       <option value="Q3">Q3</option>
//                     </select>
//                     {errors.nationalConferenceDetailsSchema?.[index]
//                       ?.publishedUnder && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {
//                           errors.nationalConferenceDetailsSchema[index]
//                             .publishedUnder.message
//                         }
//                       </p>
//                     )}
//                   </div>

//                   <FormField
//                     label="Impact Factor"
//                     stepsReference={`nationalConferenceDetailsSchema[${index}].impactFactor`}
//                     type="number"
//                   />

//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => removeNationalConference(index)}
//                       className="text-red-500 text-sm"
//                     >
//                       Remove Button
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={() =>
//                   appendNationalConference({
//                     slNo: "",
//                     titleOfResearchPaper: "",
//                     nameOfJournal: "",
//                     volume: "",
//                     issueNo: "",
//                     yearOfPublication: "",
//                     pageNoFrom: "",
//                     pageNoTo: "",
//                     author01: "",
//                     author02: "",
//                     author03: "",
//                     author04: "",
//                     publishedUnder: "Web of Science",
//                     impactFactor: "",
//                   })
//                 }
//                 className="text-blue-500 text-sm"
//               >
//                 + Add a National Conference Publication
//               </button>

//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 International Conference Details
//               </h2>

//               {internationalConference.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//                 >
//                   <FormField
//                     label="Sl.No"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].slNo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Title Of Research Paper"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].titleOfResearchPaper`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Name Of Journal"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].nameOfJournal`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Volume"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].volume`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Issue No"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].issueNo`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Year Of Publication"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].yearOfPublication`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Page No From"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].pageNoFrom`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Page No To"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].pageNoTo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Author 01"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].author01`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 02"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].author02`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 03"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].author03`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 04"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].author04`}
//                     type="text"
//                   />

//                   <div>
//                     <label
//                       htmlFor="publishedUnder"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Published Under
//                     </label>
//                     <select
//                       id="publishedUnder"
//                       {...register(
//                         `internationalConferenceDetailsSchema.${index}.publishedUnder`
//                       )}
//                       className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option value="Web of Science">Web of Science</option>
//                       <option value="Scopus">Scopus</option>
//                       <option value="Q1">Q1</option>
//                       <option value="Q2">Q2</option>
//                       <option value="Q3">Q3</option>
//                       <option value="SCI">SCI</option>
//                     </select>
//                     {errors.internationalConferenceDetailsSchema?.[index]
//                       ?.publishedUnder && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {
//                           errors.internationalConferenceDetailsSchema[index]
//                             .publishedUnder.message
//                         }
//                       </p>
//                     )}
//                   </div>

//                   <FormField
//                     label="Impact Factor"
//                     stepsReference={`internationalConferenceDetailsSchema[${index}].impactFactor`}
//                     type="number"
//                   />

//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => removeInternationalConference(index)}
//                       className="text-red-500 text-sm"
//                     >
//                       Remove Button
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() =>
//                   appendInternationalConference({
//                     slNo: "",
//                     titleOfResearchPaper: "",
//                     nameOfJournal: "",
//                     volume: "",
//                     issueNo: "",
//                     yearOfPublication: "",
//                     pageNoFrom: "",
//                     pageNoTo: "",
//                     author01: "",
//                     author02: "",
//                     author03: "",
//                     author04: "",
//                     publishedUnder: "Web of Science",
//                     impactFactor: "",
//                   })
//                 }
//                 className="text-blue-500 text-sm"
//               >
//                 + Add an International Conference Publication
//               </button>
//             </motion.div>
//           )}

//           {currentStep === 3 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Research Grants
//               </h2>
//               {researchGrants.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//                 >
//                   <FormField
//                     label="Sl.No"
//                     stepsReference={`researchGrantsSchema[${index}].slNo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Title Of Project"
//                     stepsReference={`researchGrantsSchema[${index}].titleOfProject`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Time Period Of Project (in years)"
//                     stepsReference={`researchGrantsSchema[${index}].timePeriodOfProject`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Sanctioned Date"
//                     stepsReference={`researchGrantsSchema[${index}].sanctionedDate`}
//                     type="date"
//                   />

//                   <FormField
//                     label="Amount Sanctioned"
//                     stepsReference={`researchGrantsSchema[${index}].sanctionedAmount`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Funded Agency"
//                     stepsReference={`researchGrantsSchema[${index}].fundedBy`}
//                     type="text"
//                   />
//                   <FormField
//                     label="Designation of Principal Investigator"
//                     stepsReference={`researchGrantsSchema[${index}].principalInvestigatorDesignation`}
//                     type="text"
//                   />
//                   <FormField
//                     label="Institute of Principal Investigator"
//                     stepsReference={`researchGrantsSchema[${index}].principalInvestigatorInstitute`}
//                     type="text"
//                   />
//                   <FormField
//                     label="Designation of Co-Principal Investigator"
//                     stepsReference={`researchGrantsSchema[${index}].coPrincipalInvestigatorDesignation`}
//                     type="text"
//                   />
//                   <FormField
//                     label="Institute of Co-Principal Investigator"
//                     stepsReference={`researchGrantsSchema[${index}].coPrincipalInvestigatorInstitute`}
//                     type="text"
//                   />

//                   <div>
//                     <label
//                       htmlFor="publishedUnder"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Any Phd Awarded
//                     </label>
//                     <select
//                       id="publishedUnder"
//                       {...register(
//                         `researchGrantsSchema.${index}.anyPhdAwarded`
//                       )}
//                       className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option value="Yes">Yes</option>
//                       <option value="No">No</option>
//                     </select>
//                     {errors.researchGrantsSchema?.[index]?.anyPhdAwarded && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {
//                           errors.researchGrantsSchema[index].anyPhdAwarded
//                             .message
//                         }
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="publishedUnder"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Status of Project
//                     </label>
//                     <select
//                       id="publishedUnder"
//                       {...register(`researchGrantsSchema.${index}.status`)}
//                       className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option value="Ongoing">Ongoing</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                     {errors.researchGrantsSchema?.[index]?.status && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {errors.researchGrantsSchema[index].status.message}
//                       </p>
//                     )}
//                   </div>

//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => removeResearchGrants(index)}
//                       className="text-red-500 text-sm"
//                     >
//                       Remove Button
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() =>
//                   appendResearchGrants({
//                     slNo: "",
//                     titleOfProject: "",
//                     timePeriodOfProject: "1",
//                     sanctionedDate: new Date(),
//                     sanctionedAmount: "0",
//                     fundedBy: "",
//                     principalInvestigatorDesignation: "",
//                     principalInvestigatorInstitute: "",
//                     coPrincipalInvestigatorDesignation: "",
//                     coPrincipalInvestigatorInstitute: "",
//                     anyPhdAwarded: "Yes",
//                     status: "Ongoing",
//                   })
//                 }
//                 className="text-blue-500 text-sm"
//               >
//                 + Add a Research Grant
//               </button>

//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Consultancy
//               </h2>
//               {consultancy.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//                 >
//                   <FormField
//                     label="Sl.No"
//                     stepsReference={`consultancySchema[${index}].slNo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Time Period Of Project (in years)"
//                     stepsReference={`consultancySchema[${index}].timePeriodOfProject`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Sanctioned Date"
//                     stepsReference={`consultancySchema[${index}].sanctionedDate`}
//                     type="date"
//                   />

//                   <FormField
//                     label="Amount Sanctioned"
//                     stepsReference={`consultancySchema[${index}].sanctionedAmount`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Funded Agency"
//                     stepsReference={`consultancySchema[${index}].fundedBy`}
//                     type="text"
//                   />
//                   <FormField
//                     label="Designation of Principal Investigator"
//                     stepsReference={`consultancySchema[${index}].principalInvestigatorDesignation`}
//                     type="text"
//                   />
//                   <FormField
//                     label="Institute of Principal Investigator"
//                     stepsReference={`consultancySchema[${index}].principalInvestigatorInstitute`}
//                     type="text"
//                   />
//                   <FormField
//                     label="Designation of Co-Principal Investigator"
//                     stepsReference={`consultancySchema[${index}].coPrincipalInvestigatorDesignation`}
//                     type="text"
//                   />
//                   <FormField
//                     label="Institute of Co-Principal Investigator"
//                     stepsReference={`consultancySchema[${index}].coPrincipalInvestigatorInstitute`}
//                     type="text"
//                   />

//                   <div>
//                     <label
//                       htmlFor="publishedUnder"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Status of Project
//                     </label>
//                     <select
//                       id="publishedUnder"
//                       {...register(`consultancySchema.${index}.status`)}
//                       className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option value="Ongoing">Ongoing</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                     {errors.consultancySchema?.[index]?.status && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {errors.consultancySchema[index].status.message}
//                       </p>
//                     )}
//                   </div>

//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => removeConsultancy(index)}
//                       className="text-red-500 text-sm"
//                     >
//                       Remove Button
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() =>
//                   appendConsultancy({
//                     slNo: "",
//                     timePeriodOfProject: "1",
//                     sanctionedDate: new Date(),
//                     sanctionedAmount: "0",
//                     fundedBy: "",
//                     principalInvestigatorDesignation: "",
//                     principalInvestigatorInstitute: "",
//                     coPrincipalInvestigatorDesignation: "",
//                     coPrincipalInvestigatorInstitute: "",
//                     status: "Ongoing",
//                   })
//                 }
//                 className="text-blue-500 text-sm"
//               >
//                 + Add a Consultancy
//               </button>
//             </motion.div>
//           )}

//           {currentStep === 4 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Patents
//               </h2>

//               {patents.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//                 >
//                   <FormField
//                     label="Sl.No"
//                     stepsReference={`patentsSchema[${index}].slNo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Title Of Research Patent"
//                     stepsReference={`patentsSchema[${index}].titleOfResearchPatent`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Area of Research"
//                     stepsReference={`patentsSchema[${index}].areaOfResearch`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Patent Period"
//                     stepsReference={`patentsSchema[${index}].patentPeriod`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Patent Granted Year"
//                     stepsReference={`patentsSchema[${index}].patentGrantedYear`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Author 1"
//                     stepsReference={`patentsSchema[${index}].author1`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 2"
//                     stepsReference={`patentsSchema[${index}].author2`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 3"
//                     stepsReference={`patentsSchema[${index}].author3`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Author 4"
//                     stepsReference={`patentsSchema[${index}].author4`}
//                     type="text"
//                   />

//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => removePatents(index)}
//                       className="text-red-500 text-sm"
//                     >
//                       Remove Patent
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={() =>
//                   appendPatents({
//                     slNo: "",
//                     titleOfResearchPatent: "",
//                     areaOfResearch: "",
//                     patentPeriod: "0",
//                     patentGrantedYear: "0",
//                     author1: "",
//                     author2: "",
//                     author3: "",
//                     author4: "",
//                   })
//                 }
//                 className="text-blue-500 text-sm"
//               >
//                 + Add Patent
//               </button>
//             </motion.div>
//           )}

//           {currentStep === 5 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Research Scholar
//               </h2>

//               {researchScholar.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//                 >
//                   <FormField
//                     label="Sl.No"
//                     stepsReference={`researchScholarDetailsSchema[${index}].slNo`}
//                     type="number"
//                   />

//                   <FormField
//                     label="Name Of Research Scholar"
//                     stepsReference={`researchScholarDetailsSchema[${index}].nameOfResearchScholar`}
//                     type="text"
//                   />

//                   <FormField
//                     label="University Seat Number"
//                     stepsReference={`researchScholarDetailsSchema[${index}].universitySeatNumber`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Area Of Research"
//                     stepsReference={`researchScholarDetailsSchema[${index}].areaOfResearch`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Date Of Registration"
//                     stepsReference={`researchScholarDetailsSchema[${index}].dateOfRegistration`}
//                     type="date"
//                   />

//                   <FormField
//                     label="University of Registration"
//                     stepsReference={`researchScholarDetailsSchema[${index}].universityOfRegistration`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Designation of Supervisor"
//                     stepsReference={`researchScholarDetailsSchema[${index}].designationOfResearcher`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Name of Institute"
//                     stepsReference={`researchScholarDetailsSchema[${index}].nameOfInstitute`}
//                     type="text"
//                   />

//                   <div>
//                     <label
//                       htmlFor="publishedUnder"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Progress of Research Work
//                     </label>
//                     <select
//                       id="publishedUnder"
//                       {...register(
//                         `researchScholarDetailsSchema.${index}.progressOfResearchWork`
//                       )}
//                       className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option value="Ongoing">Ongoing</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                     {errors.researchScholarDetailsSchema?.[index]
//                       ?.progressOfResearchWork && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {
//                           errors.researchScholarDetailsSchema[index]
//                             .progressOfResearchWork.message
//                         }
//                       </p>
//                     )}
//                   </div>

//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => removeResearchScholar(index)}
//                       className="text-red-500 text-sm"
//                     >
//                       Remove Research Scholar
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={() =>
//                   appendResearchScholar({
//                     slNo: "",
//                     nameOfResearchScholar: "",
//                     universitySeatNumber: "",
//                     areaOfResearch: "",
//                     dateOfRegistration: new Date(),
//                     universityOfRegistration: "",
//                     designationOfResearcher: "",
//                     nameOfInstitute: "",
//                     progressOfResearchWork: "Ongoing",
//                   })
//                 }
//                 className="text-blue-500 text-sm"
//               >
//                 + Add Research Scholar
//               </button>
//             </motion.div>
//           )}

//           {currentStep === 6 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Complete
//               </h2>
//             </motion.div>
//           )}
//         </form>
//       </FormProvider>

//       <FormNavigation
//         prevButtonFunction={prevButtonFunction}
//         steps={steps}
//         currentStep={currentStep}
//         nextButtonFunction={nextButtonFunction}
//       />
//     </section>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { NavLinks } from "@/components/faculty/ui/nav-links";

export default function ResearchProfile() {
  const [researchDetails, setResearchDetails] = useState<{
    data: {
      facultyId: string;
      orcidId: string | null;
      googleScholarId: string | null;
      scopusId: string | null;
      publonsId: string | null;
      researchId: string | null;
      patent: Array<{
        areaOfResearch: string;
        patentPeriod: string;
        grantedYear: number;
        author1: string;
        author2?: string;
        author3?: string;
        author4?: string;
        author5?: string;
        author6?: string;
      }>;
      publications: Array<{
        publicationType: string;
        name: string;
        volume?: string;
        pageNumber?: string;
        doi?: string;
        impactFactor?: number;
      }>;
      conferenceandjournal: Array<{
        role: string;
        title: string;
        journalName: string;
        issueNo?: string;
        volume?: string;
        yearOfPublication: number;
        pageNo?: string;
        author1: string;
        author2?: string;
        author3?: string;
        author4?: string;
        publishedUnder?: string;
        impactFactor?: number;
        quartile?: string;
        sponsor?: string;
        venue: string;
        fromDate: string;
        toDate: string;
      }>;
      researchGrant: Array<{
        name: string;
        sanctionedDate: string;
        projectPeriod: string;
        amountSanctioned: number;
        fundedBy: string;
        principalInvestigator: string;
        coPrincipalInvestigator?: string;
        phdAwarded: boolean;
        status: string;
      }>;
      consultancy: Array<{
        faculty1: string;
        faculty2: string;
        faculty3: string;
        sanctionedDate: string;
        projectPeriod: string;
        amount: number;
        principalInvestigator: string;
        coPrincipalInvestigator?: string;
        status: string;
      }>;
    };
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResearchDetails() {
      try {
        const token = localStorage.getItem("token");
        const facultyId = token ? JSON.parse(token).facultyId : null;

        if (!facultyId) {
          notFound();
          return;
        }

        const response = await fetch(
          `/api/facultyresearchdetails?facultyId=${facultyId}`
        );
        if (!response.ok) {
          notFound();
          return;
        }

        const data = await response.json();
        setResearchDetails(data);
      } catch (error) {
        console.error("Error fetching research details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResearchDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!researchDetails) {
    return <div>Research details not found</div>;
  }

  return (
    <div>
      <NavLinks />
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Research Details
        </h1>

        {/* Research Identifiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">ORCID ID</p>
            <p className="font-medium text-gray-800">
              {researchDetails.data.orcidId || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Google Scholar ID</p>
            <p className="font-medium text-gray-800">
              {researchDetails.data.googleScholarId || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Scopus ID</p>
            <p className="font-medium text-gray-800">
              {researchDetails.data.scopusId || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Publons ID</p>
            <p className="font-medium text-gray-800">
              {researchDetails.data.publonsId || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Research ID</p>
            <p className="font-medium text-gray-800">
              {researchDetails.data.researchId || "N/A"}
            </p>
          </div>
        </div>

        {/* Patents */}
        {/* <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Patents</h2>
          {console.log(researchDetails)}
          {researchDetails.data.patent.map((patent, index) => (
            <div key={index} className="mb-4">
              <p className="text-sm text-gray-500">Area of Research</p>
              <p className="font-medium text-gray-800">
                {patent.areaOfResearch}
              </p>
              <p className="text-sm text-gray-500">Patent Period</p>
              <p className="font-medium text-gray-800">{patent.patentPeriod}</p>
              <p className="text-sm text-gray-500">Granted Year</p>
              <p className="font-medium text-gray-800">{patent.grantedYear}</p>
              <p className="text-sm text-gray-500">Authors</p>
              <p className="font-medium text-gray-800">
                {[
                  patent.author1,
                  patent.author2,
                  patent.author3,
                  patent.author4,
                  patent.author5,
                  patent.author6,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          ))}
        </div> */}

        {/* Publications */}
        {/* <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Publications
          </h2>
          {researchDetails.data.publications.map((publication, index) => (
            <div key={index} className="mb-4">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-800">{publication.name}</p>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium text-gray-800">
                {publication.publicationType}
              </p>
              <p className="text-sm text-gray-500">Volume</p>
              <p className="font-medium text-gray-800">
                {publication.volume || "N/A"}
              </p>
              <p className="text-sm text-gray-500">Impact Factor</p>
              <p className="font-medium text-gray-800">
                {publication.impactFactor || "N/A"}
              </p>
            </div>
          ))}
        </div> */}

        {/* Conferences */}
        {/* <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Conferences & Journals
          </h2>
          {researchDetails.data.conferenceandjournal.map(
            (conference, index) => (
              <div key={index} className="mb-4">
                <p className="text-sm text-gray-500">Title</p>
                <p className="font-medium text-gray-800">{conference.title}</p>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium text-gray-800">{conference.role}</p>
                <p className="text-sm text-gray-500">Venue</p>
                <p className="font-medium text-gray-800">{conference.venue}</p>
                <p className="text-sm text-gray-500">Year of Publication</p>
                <p className="font-medium text-gray-800">
                  {conference.yearOfPublication}
                </p>
              </div>
            )
          )}
        </div> */}
      </div>
    </div>
  );
}
