// "use client";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { z } from "zod";
// import { facultyPersonalDetailsSchema } from "@/schemas/personal-details";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
// import FormProgress from "@/components/FormProgress";
// import FormNavigation from "@/components/FormNavigation";
// import FormField from "@/components/FormField";
// import { Step } from "@/types/form";
// import { FormProvider } from "@/hooks/FormProvider";
// import Header from "@/components/ui/header";
// import { NavLinks } from "@/components/faculty/ui/nav-links";
// // import { PDFDocument, StandardFonts } from "pdf-lib";
// // import { saveAs } from "file-saver";
// import ProfilePhotoInput from "@/components/image";
// type Inputs = z.infer<typeof facultyPersonalDetailsSchema>;

// const defaultData = {
//   personalSchema: {
//     qualification: "Master's Degree",
//     title: "Dr.",
//     prefix: "Mr.",
//     firstName: "J123213n",
//     lastName: "Doe",
//     emailId: "johndoe@example.com",
//     contactNo: "1234567890",
//     alternateContactNo: "0987654321",
//     emergencyContactNo: "1122334455",
//     aadhar: "1234-5678-9101",
//     pan: "ABCDE1234F",
//     dob: new Date("1980-01-01"),
//     gender: "Male",
//     nationality: "Indian",
//     firstAddressLine1: "123 Street Name",
//     firstAddressLine2: "Area Name",
//     firstAddressLine3: "City, State, ZIP",
//     correspondenceAddressLine1: "456 Another St",
//     correspondenceAddressLine2: "Area Name",
//     correspondenceAddressLine3: "City, State, ZIP",
//     religion: "Hindu",
//     caste: "General",
//     category: "Open",
//     motherTongue: "Kannada",
//     speciallyChanged: false,
//     speciallyChangedRemarks: "",
//     languagesToSpeak: ["English", "Kannada"],
//     languagesToRead: ["English", "Kannada"],
//     languagesToWrite: ["English", "Kannada"],
//   },
//   financialSchema: {
//     bankName: "ABC Bank",
//     accountNo: "123456789012",
//     accountName: "John Doe",
//     typeOfAccount: "Savings",
//     branch: "Main Branch",
//     ifscCode: "ABC0123456",
//     pfNumber: "PF123456",
//     uanNumber: "UAN123456",
//     pensionNumber: "PN123456",
//   },
//   educationSchema: [
//     { degree: "Bachelor of Science", institute: "XYZ University", year: "2002" },
//     { degree: "Master's in Technology", institute: "ABC University", year: "2004" },
//   ],
//   dependentsSchema: {
//     motherName: "Jane Doe",
//     fatherName: "Robert Doe",
//     spouseName: "Emily Doe",
//     children: ["Child 1", "Child 2"],
//   },
// };
// const onSubmit = async (data = defaultData) => {
//   // Create a new PDF document
//   const pdfDoc = await PDFDocument.create();
//   const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

//   // Add a page to the PDF document
//   const page = pdfDoc.addPage([600, 900]);
//   const { width, height } = page.getSize();
//   const fontSize = 12;
//   let yPos = height - 40;

//   // Header
//   page.drawText("Faculty Personal Details", {
//     x: 50,
//     y: yPos,
//     size: fontSize + 4,
//     font: timesRomanFont,
//   });

//   // Utility function to add fields to the PDF
//   const addField = (label: string, value: string) => {
//     yPos -= 20;
//     page.drawText(`${label}: ${value}`, {
//       x: 50,
//       y: yPos,
//       size: fontSize,
//       font: timesRomanFont,
//     });
//   };

//   // Adding Personal Information to the PDF
//   yPos -= 40;
//   page.drawText("Personal Information", {
//     x: 50,
//     y: yPos,
//     size: fontSize + 2,
//     font: timesRomanFont,
//   });
//   addField("Qualification", data.personalSchema.qualification);
//   addField("Title", data.personalSchema.title);
//   addField("Prefix", data.personalSchema.prefix);
//   addField("First Name", data.personalSchema.firstName);
//   addField("Last Name", data.personalSchema.lastName);
//   addField("Email", data.personalSchema.emailId);
//   addField("Contact No", data.personalSchema.contactNo);
//   addField("Alternate Contact No", data.personalSchema.alternateContactNo);
//   addField("Emergency Contact No", data.personalSchema.emergencyContactNo);
//   addField("Aadhar", data.personalSchema.aadhar);
//   addField("PAN", data.personalSchema.pan);
//   addField("Date of Birth", data.personalSchema.dob.toDateString());
//   addField("Gender", data.personalSchema.gender);
//   addField("Nationality", data.personalSchema.nationality);

//   // Adding Address Information
//   yPos -= 30;
//   page.drawText("Address Details", {
//     x: 50,
//     y: yPos,
//     size: fontSize + 2,
//     font: timesRomanFont,
//   });
//   addField("Permanent Address Line 1", data.personalSchema.firstAddressLine1);
//   addField("Permanent Address Line 2", data.personalSchema.firstAddressLine2);
//   addField("Permanent Address Line 3", data.personalSchema.firstAddressLine3);
//   addField("Correspondence Address Line 1", data.personalSchema.correspondenceAddressLine1);
//   addField("Correspondence Address Line 2", data.personalSchema.correspondenceAddressLine2);
//   addField("Correspondence Address Line 3", data.personalSchema.correspondenceAddressLine3);

//   // Adding Other Details
//   yPos -= 30;
//   page.drawText("Other Details", {
//     x: 50,
//     y: yPos,
//     size: fontSize + 2,
//     font: timesRomanFont,
//   });
//   addField("Religion", data.personalSchema.religion);
//   addField("Caste", data.personalSchema.caste);
//   addField("Category", data.personalSchema.category);
//   addField("Mother Tongue", data.personalSchema.motherTongue);
//   addField("Specially Changed", data.personalSchema.speciallyChanged ? "Yes" : "No");
//   addField("Specially Changed Remarks", data.personalSchema.speciallyChangedRemarks);
//   addField("Languages Spoken", data.personalSchema.languagesToSpeak.join(", "));
//   addField("Languages Read", data.personalSchema.languagesToRead.join(", "));
//   addField("Languages Written", data.personalSchema.languagesToWrite.join(", "));

//   // Adding Financial Details
//   yPos -= 30;
//   page.drawText("Financial Details", {
//     x: 50,
//     y: yPos,
//     size: fontSize + 2,
//     font: timesRomanFont,
//   });
//   addField("Bank Name", data.financialSchema.bankName);
//   addField("Account No", data.financialSchema.accountNo);
//   addField("Account Name", data.financialSchema.accountName);
//   addField("Account Type", data.financialSchema.typeOfAccount);
//   addField("Branch", data.financialSchema.branch);
//   addField("IFSC Code", data.financialSchema.ifscCode);
//   addField("PF Number", data.financialSchema.pfNumber);
//   addField("UAN Number", data.financialSchema.uanNumber);
//   addField("Pension Number", data.financialSchema.pensionNumber);

//   // Adding Education Details
//   yPos -= 30;
//   page.drawText("Education Details", {
//     x: 50,
//     y: yPos,
//     size: fontSize + 2,
//     font: timesRomanFont,
//   });
//   data.educationSchema.forEach((edu, index) => {
//     addField(`Education ${index + 1}`, `${edu.degree} from ${edu.institute}`);
//     addField("Year", edu.year);
//   });

//   // Adding Dependent Details
//   yPos -= 30;
//   page.drawText("Dependent Details", {
//     x: 50,
//     y: yPos,
//     size: fontSize + 2,
//     font: timesRomanFont,
//   });
//   addField("Mother's Name", data.dependentsSchema.motherName);
//   addField("Father's Name", data.dependentsSchema.fatherName);
//   addField("Spouse Name", data.dependentsSchema.spouseName);
//   data.dependentsSchema.children.forEach((child, index) => {
//     addField(`Child ${index + 1}`, child);
//   });

//   // Save the PDF and trigger download
//   const pdfBytes = await pdfDoc.save();
//   saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "FacultyDetails.pdf");
// };

// const steps: Step[] = [
//   {
//     id: "Step 1",
//     name: "Personal Information",
//     fields: [
//       "personalSchema.qualification",
//       "personalSchema.title",
//       "personalSchema.prefix",
//       "personalSchema.firstName",
//       "personalSchema.lastName",
//       "personalSchema.emailId",
//       "personalSchema.contactNo",
//       "personalSchema.alternateContactNo",
//       "personalSchema.emergencyContactNo",
//       "personalSchema.aadhar",
//       "personalSchema.pan",
//       "personalSchema.dob",
//       "personalSchema.gender",
//       "personalSchema.nationality",
//     ],
//   },
//   {
//     id: "Step 2",
//     name: "Address",
//     fields: [
//       "personalSchema.firstAddressLine2",
//       "personalSchema.firstAddressLine1",
//       "personalSchema.firstAddressLine3",
//       "personalSchema.correspondenceAddressLine1",
//       "personalSchema.correspondenceAddressLine2",
//       "personalSchema.correspondenceAddressLine3",
//     ],
//   },
//   {
//     id: "Step 3",
//     name: "Other Details",
//     fields: [
//       "personalSchema.religion",
//       "personalSchema.caste",
//       "personalSchema.category",
//       "personalSchema.motherTongue",
//       "personalSchema.speciallyChanged",
//       "personalSchema.speciallyChangedRemarks",
//       "personalSchema.languagesToSpeak",
//       "personalSchema.languagesToRead",
//       "personalSchema.languagesToWrite",
//     ],
//   },
//   {
//     id: "Step 4",
//     name: "Account Details",
//     fields: [
//       "financialSchema.bankName",
//       "financialSchema.accountNo",
//       "financialSchema.accountName",
//       "financialSchema.typeOfAccount",
//       "financialSchema.branch",
//       "financialSchema.ifscCode",
//       "financialSchema.pfNumber",
//       "financialSchema.uanNumber",
//       "financialSchema.pensionNumber",
//     ],
//   },
//   {
//     id: "Step 5",
//     name: "Education Details",
//     fields: ["educationSchema"],
//   },
//   {
//     id: "Step 6",
//     name: "Dependents",
//     fields: [
//       "dependentsSchema.motherName",
//       "dependentsSchema.fatherName",
//       "dependentsSchema.spouseName",
//       "dependentsSchema.children",
//     ],
//   },
//   {
//     id: "Step 7",
//     name: "Complete",
//     fields: [],
//   },
// ];

// const languagesOptions = [
//   "English",
//   "Hindi",
//   "Kannada",
//   "Malayalam",
//   "Tamil",
//   "Telugu",
//   "Marathi",
//   "Gujarati",
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
//     resolver: zodResolver(facultyPersonalDetailsSchema),
//     defaultValues: {
//       personalSchema: {
//         qualification: "B.Tech",    // Default value for qualification
//         title: "Mr.",               // Default value for title
//         prefix: "Mr",
//         firstName: "Joh123123n",          // Default value for firstName
//         lastName: "Doe",            // Default value for lastName
//         emailId: "john@example.com", // Default value for email
//         contactNo: "1234567890",
//         alternateContactNo: "0987654321",
//         emergencyContactNo: "1122334455",
//         aadhar: "123412341234",
//         pan: "ABCDE1234F",
//         dob: new Date("01-01-1990"),
//         gender: "Male",
//         nationality: "Indian",
//         firstAddressLine1: "123 Main St",
//         firstAddressLine2: "Apartment 1",
//         firstAddressLine3: "cc , blr",
//         correspondenceAddressLine1: "456 Elm St",
//         correspondenceAddressLine2: "Building 5",
//         correspondenceAddressLine3: "cc , blr",
//         religion: "Hindu",
//         caste: "General",
//         category: "OBC",
//         motherTongue: "Hindi",
//         speciallyChanged: false,
//         speciallyChangedRemarks: "",
//         languagesToSpeak: ["English", "Hindi"],  // Default language selections
//         languagesToRead: ["English"],
//         languagesToWrite: ["English"],
//       },
//       financialSchema: {
//         bankName: "ABC Bank",
//         accountNo: "1234567890",
//         accountName: "John Doe",
//         typeOfAccount: "Savings",
//         branch: "Main Branch",
//         ifscCode: "ABC1234",
//         pfNumber: "PF12345",
//         uanNumber: "UAN67890",
//         pensionNumber: "PEN00123",
//       },
//       educationSchema: [],  // Assuming this might be an array of objects for multiple entries
//       dependentsSchema: {
//         motherName: "Jane Doe",
//         fatherName: "Robert Doe",
//         spouseName: "Mary Doe",
//         children: [],
//       },
//     },
//   });

//   const [isSameAddress, setIsSameAddress] = useState(false);
//   const dob =watch("personalSchema.dob")
//   const firstAddressLine1 = watch("personalSchema.firstAddressLine1");
//   const firstAddressLine2 = watch("personalSchema.firstAddressLine2");
//   const firstAddressLine3 = watch("personalSchema.firstAddressLine3");

//   const handleCheckboxChange = (e: any) => {
//     setIsSameAddress(e.target.checked);

//     if (!e.target.checked) {
//       // Clear correspondence address fields when unchecked
//       setValue("personalSchema.correspondenceAddressLine1", "");
//       setValue("personalSchema.correspondenceAddressLine2", "");
//       setValue("personalSchema.correspondenceAddressLine3", "");
//     }
//   };

//   // Sync correspondence address fields if checkbox is checked
//   useEffect(() => {
//     if (isSameAddress) {
//       setValue("personalSchema.correspondenceAddressLine1", firstAddressLine1);
//       setValue("personalSchema.correspondenceAddressLine2", firstAddressLine2);
//       setValue("personalSchema.correspondenceAddressLine3", firstAddressLine3);
//     }
//   }, [isSameAddress, firstAddressLine1, firstAddressLine2, firstAddressLine3]);

//   // Initialize useFieldArray for children
//   const {
//     fields: childFields,
//     append: appendChild,
//     remove: removeChild,
//   } = useFieldArray({
//     control,
//     name: "dependentsSchema.children",
//   });

//   // Initialize useFieldArray for education details
//   const {
//     fields: educationFields,
//     append: appendEducation,
//     remove: removeEducation,
//   } = useFieldArray({
//     control,
//     name: "educationSchema",
//   });

//   const processForm: SubmitHandler<Inputs> = async (data) => {
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
//       <div className="flex justify-end pt-[20px]">
//         <button
//           type="button"
//           onClick={() => onSubmit(defaultData)}
//           className="bg-blue-400 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-gray-800 transition duration-200"
//         >
//           Export as PDF
//         </button>
//       </div>

//     <section className=" flex flex-col justify-between p-24">
//       <FormProgress steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />

//       <FormProvider register={register} errors={errors}>
//         <form onSubmit={handleSubmit(processForm)} className="mt-12 py-12">
//           {currentStep === 0 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Personal Information
//               </h2>

//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <ProfilePhotoInput className="col-span-2" />
//                 <FormField
//                   label="Qualification"
//                   stepsReference="personalSchema.qualification"
//                   type="text"
//                 />

//                 <FormField
//                   label="Title"
//                   stepsReference="personalSchema.title"
//                   type="text"
//                 />

//                 <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
//                   <div className="col-span-1">
//                     <label
//                       htmlFor="prefix"
//                       className="block  text-sm font-medium text-gray-700"
//                     >
//                       Prefix
//                     </label>
//                     <select
//                       id="prefix"
//                       {...register("personalSchema.prefix")}
//                       className="mt-1 w-full block p-1 py-2 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option>Mr</option>
//                       <option>Mrs</option>
//                       <option>Ms</option>
//                       <option>Dr</option>
//                       <option>Prof</option>
//                     </select>
//                   </div>

//                   <div className="col-span-5">
//                     <label
//                       htmlFor="firstName"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       {...register("personalSchema.firstName")}
//                       className="mt-1 block w-full p-1 py-1.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     />
//                     {errors.personalSchema?.firstName && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {errors.personalSchema.firstName.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <FormField
//                   label="Last Name"
//                   stepsReference="personalSchema.lastName"
//                   type="text"
//                 />
//                 <FormField
//                   label="Email ID"
//                   stepsReference="personalSchema.emailId"
//                   type="email"
//                 />

//                 <FormField
//                   label="Contact Number"
//                   stepsReference="personalSchema.contactNo"
//                   type="tel"
//                 />

//                 <FormField
//                   label="Alternate Contact Number"
//                   stepsReference="personalSchema.alternateContactNo"
//                   type="tel"
//                 />

//                 <FormField
//                   label="Emergency Contact Number"
//                   stepsReference="personalSchema.emergencyContactNo"
//                   type="tel"
//                 />

//                 <FormField
//                   label="Aadhar Number"
//                   stepsReference="personalSchema.aadhar"
//                   type="text"
//                 />

//                 <FormField
//                   label="PAN Number"
//                   stepsReference="personalSchema.pan"
//                   type="text"
//                 />
//                 <FormField
//                   label="Date of Birth"
//                   stepsReference="personalSchema.dob"
//                   type="date"
//                 />

//                 <div>
//                   <label
//                     htmlFor="gender"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Gender
//                   </label>
//                   <select
//                     id="gender"
//                     {...register("personalSchema.gender")}
//                     className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                   >
//                     <option>Male</option>
//                     <option>Female</option>
//                     <option>Other</option>
//                   </select>
//                   {errors.personalSchema?.gender && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.personalSchema.gender.message}
//                     </p>
//                   )}
//                 </div>

//                 <FormField
//                   label="Nationality"
//                   stepsReference="personalSchema.nationality"
//                   type="text"
//                 />
//               </div>
//             </motion.div>
//           )}

//           {currentStep === 1 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Address
//               </h2>

//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <FormField
//                   label="First Address Line 1"
//                   stepsReference="personalSchema.firstAddressLine1"
//                   type="text"
//                 />

//                 <FormField
//                   label="First Address Line 2"
//                   stepsReference="personalSchema.firstAddressLine2"
//                   type="text"
//                 />

//                 <FormField
//                   label="First Address Line 3"
//                   stepsReference="personalSchema.firstAddressLine3"
//                   type="text"
//                 />

//                 {/* Checkbox for Same Address */}
//                 <div className="sm:col-span-2">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={isSameAddress}
//                       onChange={handleCheckboxChange}
//                       className="mr-2"
//                     />
//                     Same as First Address
//                   </label>
//                 </div>

//                 <FormField
//                   label="Correspondence Address Line 1"
//                   stepsReference="personalSchema.correspondenceAddressLine1"
//                   type="text"
//                   disabled={isSameAddress}
//                 />

//                 <FormField
//                   label="Correspondence Address Line 2"
//                   stepsReference="personalSchema.correspondenceAddressLine2"
//                   type="text"
//                   disabled={isSameAddress}
//                 />

//                 <FormField
//                   label="Correspondence Address Line 3"
//                   stepsReference="personalSchema.correspondenceAddressLine3"
//                   type="text"
//                   disabled={isSameAddress}
//                 />
//               </div>
//             </motion.div>
//           )}

//           {currentStep === 2 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Other Details
//               </h2>
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 {/* Religion Dropdown */}
//                 <div>
//                   <label
//                     htmlFor="religion"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Religion
//                   </label>
//                   <select
//                     id="religion"
//                     {...register("personalSchema.religion")}
//                     className="mt-1 block w-full p-2 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                   >
//                     <option value="">Select Religion</option>
//                     <option value="Hindu">Hindu</option>
//                     <option value="Muslim">Muslim</option>
//                     <option value="Christian">Christian</option>
//                     <option value="Sikh">Sikh</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   {errors.personalSchema?.religion && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.personalSchema.religion.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Caste Dropdown */}
//                 <div>
//                   <label
//                     htmlFor="caste"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Caste
//                   </label>
//                   <select
//                     id="caste"
//                     {...register("personalSchema.caste")}
//                     className="mt-1 block w-full p-2 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                   >
//                     <option value="">Select Caste</option>
//                     <option value="Brahmins">Brahmins</option>
//                     <option value="Thakur">Thakur</option>
//                     <option value="Vaishya">Vaishya</option>
//                     <option value="Tyagi">Tyagi</option>
//                     <option value="Bhumihar">Bhumihar</option>
//                     <option value="Muslims">Muslims</option>
//                     <option value="Christians">Christians</option>
//                     <option value="Rajput">Rajput</option>
//                     <option value="Kayastha">Kayastha</option>
//                     <option value="Pathans">Pathans</option>
//                     <option value="Muslim Mughals">Muslim Mughals</option>
//                     <option value="Muslim Shaikh">Muslim Shaikh</option>
//                     <option value="Muslim Sayyad">Muslim Sayyad</option>
//                     <option value="Jat Sikh">Jat Sikh</option>
//                     <option value="Bania">Bania</option>
//                     <option value="Punjabi Khatri">Punjabi Khatri</option>
//                     <option value="Punjabi Arora">Punjabi Arora</option>
//                     <option value="Punjabi Sood">Punjabi Sood</option>
//                     <option value="Baidya">Baidya</option>
//                     <option value="Patidar">Patidar</option>
//                     <option value="Patel">Patel</option>
//                     <option value="Kshatriya">Kshatriya</option>
//                     <option value="Reddy">Reddy</option>
//                     <option value="Kamma">Kamma</option>
//                     <option value="Kapu">Kapu</option>
//                     <option value="Gomati Baniya">Gomati Baniya</option>
//                     <option value="Velamma">Velamma</option>
//                     <option value="Kshatriya Raju">Kshatriya Raju</option>
//                     <option value="Iyengar">Iyengar</option>
//                     <option value="Iyer">Iyer</option>
//                     <option value="Vellalars">Vellalars</option>
//                     <option value="Nair">Nair</option>
//                     <option value="Naidu">Naidu</option>
//                     <option value="Mukkulathor">Mukkulathor</option>
//                     <option value="Sengunthar">Sengunthar</option>
//                     <option value="Parkavakulam">Parkavakulam</option>
//                     <option value="Nagarathar Baniya">Nagarathar Baniya</option>
//                     <option value="Komati">Komati</option>
//                     <option value="Vokkaligas">Vokkaligas</option>
//                     <option value="Lingayats">Lingayats</option>
//                     <option value="Bunts">Bunts</option>
//                   </select>
//                   {errors.personalSchema?.caste && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.personalSchema.caste.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Category Dropdown */}
//                 <div>
//                   <label
//                     htmlFor="category"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Category
//                   </label>
//                   <select
//                     id="category"
//                     {...register("personalSchema.category")}
//                     className="mt-1 block w-full p-2 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="General">General</option>
//                     <option value="OBC">OBC</option>
//                     <option value="SC">SC</option>
//                     <option value="ST">ST</option>
//                   </select>
//                   {errors.personalSchema?.category && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.personalSchema.category.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Mother Tongue Dropdown */}
//                 <div>
//                   <label
//                     htmlFor="motherTongue"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Mother Tongue
//                   </label>
//                   <select
//                     id="motherTongue"
//                     {...register("personalSchema.motherTongue")}
//                     className="mt-1 block w-full p-2 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                   >
//                     <option value="">Select Mother Tongue</option>
//                     <option value="Kannada">Kannada</option>
//                     <option value="Malayalam">Malayalam</option>
//                     <option value="Hindi">Hindi</option>
//                     <option value="English">English</option>
//                     <option value="Tamil">Tamil</option>
//                     <option value="Telugu">Telugu</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   {errors.personalSchema?.motherTongue && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.personalSchema.motherTongue.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Specially Challenged Checkbox */}
//                 <div>
//                   <label
//                     htmlFor="speciallyChanged"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Specially Challenged
//                   </label>
//                   <input
//                     type="checkbox"
//                     id="speciallyChanged"
//                     {...register("personalSchema.speciallyChanged")}
//                     className="mt-1"
//                   />
//                   {errors.personalSchema?.speciallyChanged && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.personalSchema.speciallyChanged.message}
//                     </p>
//                   )}
//                   <label
//                     htmlFor="speciallyChangedRemarks"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Specially Challenged Remarks
//                   </label>
//                   <input
//                     type="text"
//                     id="speciallyChangedRemarks"
//                     {...register("personalSchema.speciallyChangedRemarks")}
//                     className="mt-1 block w-full p-1 py-1.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                   />
//                   {errors.personalSchema?.speciallyChangedRemarks && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.personalSchema.speciallyChangedRemarks.message}
//                     </p>
//                   )}
//                 </div>

//                 <div></div>

//                 {/* Languages to Speak (Multiselect Checkboxes) */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Languages to Speak
//                   </label>
//                   <div className="mt-1 grid grid-cols-2 gap-2">
//                     {languagesOptions.map((language) => (
//                       <div key={language} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`languagesToSpeak_${language}`}
//                           value={language}
//                           {...register("personalSchema.languagesToSpeak")}
//                           className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
//                         />
//                         <label
//                           htmlFor={`languagesToSpeak_${language}`}
//                           className="ml-2 block text-sm text-gray-900"
//                         >
//                           {language}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                   {errors.personalSchema?.languagesToSpeak && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.personalSchema.languagesToSpeak.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Languages to Read (Multiselect Checkboxes) */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Languages to Read
//                   </label>
//                   <div className="mt-1 grid grid-cols-2 gap-2">
//                     {languagesOptions.map((language) => (
//                       <div key={language} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`languagesToRead_${language}`}
//                           value={language}
//                           {...register("personalSchema.languagesToRead")}
//                           className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
//                         />
//                         <label
//                           htmlFor={`languagesToRead_${language}`}
//                           className="ml-2 block text-sm text-gray-900"
//                         >
//                           {language}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                   {errors.personalSchema?.languagesToRead && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.personalSchema.languagesToRead.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Languages to Write (Multiselect Checkboxes) */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Languages to Write
//                   </label>
//                   <div className="mt-1 grid grid-cols-2 gap-2">
//                     {languagesOptions.map((language) => (
//                       <div key={language} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`languagesToWrite_${language}`}
//                           value={language}
//                           {...register("personalSchema.languagesToWrite")}
//                           className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
//                         />
//                         <label
//                           htmlFor={`languagesToWrite_${language}`}
//                           className="ml-2 block text-sm text-gray-900"
//                         >
//                           {language}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                   {errors.personalSchema?.languagesToWrite && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.personalSchema.languagesToWrite.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {currentStep === 3 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Financial Details
//               </h2>

//               {/* Financial Details Form Fields */}
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <FormField
//                   label="Bank Name"
//                   stepsReference="financialSchema.bankName"
//                   type="text"
//                 />

//                 <FormField
//                   label="Account Number"
//                   stepsReference="financialSchema.accountNo"
//                   type="text"
//                 />

//                 <FormField
//                   label="Account Name"
//                   stepsReference="financialSchema.accountName"
//                   type="text"
//                 />

//                 <div>
//                   <label
//                     htmlFor="typeOfAccount"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Type of Account
//                   </label>
//                   <select
//                     id="typeOfAccount"
//                     {...register("financialSchema.typeOfAccount")}
//                     className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                   >
//                     <option>Savings</option>
//                     <option>Current</option>
//                   </select>
//                   {errors.financialSchema?.typeOfAccount && (
//                     <p className="mt-2 text-sm text-red-600">
//                       {errors.financialSchema.typeOfAccount.message}
//                     </p>
//                   )}
//                 </div>

//                 <FormField
//                   label="Branch"
//                   stepsReference="financialSchema.branch"
//                   type="text"
//                 />

//                 <FormField
//                   label="IFSC Code"
//                   stepsReference="financialSchema.ifscCode"
//                   type="text"
//                 />

//                 <FormField
//                   label="PF Number"
//                   stepsReference="financialSchema.pfNumber"
//                   type="text"
//                 />

//                 <FormField
//                   label="UAN Number"
//                   stepsReference="financialSchema.uanNumber"
//                   type="text"
//                 />

//                 <FormField
//                   label="Pension Number"
//                   stepsReference="financialSchema.pensionNumber"
//                   type="text"
//                 />
//               </div>
//             </motion.div>
//           )}

//           {currentStep === 4 && (
//             <motion.div
//               initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//                 Education Details
//               </h2>

//               {/* Education Details Form Fields */}
//               {educationFields.map((item, index) => (
//                 <div
//                   key={item.id}
//                   className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//                 >
//                   <FormField
//                     label="Program (Class)"
//                     stepsReference={`educationSchema.${index}.class`}
//                     type="text"
//                   />

//                   <FormField
//                     label="USN"
//                     stepsReference={`educationSchema.${index}.usn`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Institution"
//                     stepsReference={`educationSchema.${index}.institution`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Specialization"
//                     stepsReference={`educationSchema.${index}.specialization`}
//                     type="text"
//                   />

//                   <FormField
//                     label="Medium of Instruction"
//                     stepsReference={`educationSchema.${index}.mediumOfInstruction`}
//                     type="text"
//                   />

//                   {/* Direct Correspondence Dropdown */}
//                   <div>
//                     <label
//                       htmlFor="directCorr"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Direct/Correspondence
//                     </label>
//                     <select
//                       id="directCorr"
//                       {...register(`educationSchema.${index}.directCorr`)}
//                       className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option value="Direct">Direct</option>
//                       <option value="Correspondence">Correspondence</option>
//                     </select>
//                     {errors.educationSchema?.[index]?.directCorr && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {errors.educationSchema[index].directCorr.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Pass Class Dropdown */}
//                   <div>
//                     <label
//                       htmlFor="passClass"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Pass Class
//                     </label>
//                     <select
//                       id="passClass"
//                       {...register(`educationSchema.${index}.passClass`)}
//                       className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                     >
//                       <option value="Distinction">Distinction</option>
//                       <option value="First">First</option>
//                       <option value="Second">Second</option>
//                       <option value="Third">Third</option>
//                       <option value="Fail">Fail</option>
//                     </select>
//                     {errors.educationSchema?.[index]?.passClass && (
//                       <p className="mt-2 text-sm text-red-600">
//                         {errors.educationSchema[index].passClass.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Remove Education Button */}
//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => removeEducation(index)}
//                       className="text-red-600 text-sm"
//                     >
//                       Remove Education
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {/* Add Education Button */}
//               <button
//                 type="button"
//                 onClick={() =>
//                   appendEducation({
//                     class: "",
//                     usn: "",
//                     institution: "",
//                     specialization: "",
//                     mediumOfInstruction: "",
//                     directCorr: "Direct",
//                     passClass: "First",
//                   })
//                 }
//                 className="text-indigo-600 text-sm"
//               >
//                 + Add Education
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
//                 Dependents
//               </h2>

//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <FormField
//                   label="Mother Name"
//                   stepsReference="dependentsSchema.motherName"
//                   type="text"
//                 />

//                 <FormField
//                   label="Father Name"
//                   stepsReference="dependentsSchema.fatherName"
//                   type="text"
//                 />

//                 <FormField
//                   label="Spouse Name"
//                   stepsReference="dependentsSchema.spouseName"
//                   type="text"
//                 />

//                 {/* Children */}
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 py-2">
//                     Children
//                   </label>

//                   {childFields.map((child, index) => (
//                     <div
//                       key={child.id}
//                       className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4"
//                     >
//                       {/* Child Name */}
//                       <FormField
//                         label="Name"
//                         stepsReference={`dependentsSchema.children[${index}].name`}
//                         type="text"
//                       />

//                       {/* Child Gender */}
//                       <div>
//                         <label
//                           htmlFor={`children[${index}].gender`}
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Gender
//                         </label>
//                         <select
//                           id={`children[${index}].gender`}
//                           {...register(
//                             `dependentsSchema.children.${index}.gender`
//                           )}
//                           className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                         >
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                           <option value="Prefer not to say">
//                             Prefer not to say
//                           </option>
//                         </select>
//                         {errors.dependentsSchema?.children?.[index]?.gender && (
//                           <p className="mt-2 text-sm text-red-600">
//                             {
//                               errors.dependentsSchema.children[index].gender
//                                 .message
//                             }
//                           </p>
//                         )}
//                       </div>

//                       {/* Child Date of Birth */}
//                       <div>
//                         <label
//                           htmlFor={`children[${index}].dob`}
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Date of Birth
//                         </label>
//                         <input
//                           type="date"
//                           id={`children[${index}].dob`}
//                           {...register(
//                             `dependentsSchema.children.${index}.dob`
//                           )}
//                           className="mt-1 block w-full p-1 py-1.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
//                         />
//                         {errors.dependentsSchema?.children?.[index]?.dob && (
//                           <p className="mt-2 text-sm text-red-600">
//                             {
//                               errors.dependentsSchema.children[index].dob
//                                 .message
//                             }
//                           </p>
//                         )}
//                       </div>

//                       {/* Remove Child Button */}
//                       <div className="col-span-3 flex justify-end">
//                         <button
//                           type="button"
//                           onClick={() => removeChild(index)}
//                           className="text-red-600 text-sm"
//                         >
//                           Remove Child
//                         </button>
//                       </div>
//                     </div>
//                   ))}

//                   {/* Add Child Button */}
//                   <div className="mt-4">
//                     <button
//                       type="button"
//                       onClick={() =>
//                         appendChild({
//                           name: "",
//                           gender: "Male",
//                           dob: new Date(),
//                         })
//                       }
//                       className="text-indigo-600 text-sm"
//                     >
//                       + Add Child
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {currentStep === 6 && <div>Complete</div>}
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

// export default async function Page() {
//   const res = await fetch("http://localhost:3000/api/facultypersonaldetails");
//   const newData = await res.json();

//   // Assuming newData.data is an object with multiple fields
//   const facultyDetails = newData.data;
//   // Render specific fields from the object, e.g., firstName, lastName, etc.
//   return (
//     <div>
//       <h1>
//         {facultyDetails.firstName} {newData.data.lastName}
//       </h1>
//       <p>Email: {facultyDetails.emailId}</p>
//       <p>Designation: {facultyDetails.spouseName}</p>
//       {/* Render other fields as needed */}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { NavLinks } from "@/components/ui/nav-links";
import Image from "next/image";

export default function FacultyProfile() {
  const [facultyDetails, setFacultyDetails] = useState<{
    data: {
      photo: string;
      firstName: string;
      lastName: string;
      facultyId: string;
      spouseName: string;
      qualification: string;
      title: string;
      middleName: string;
      emailId: string;
      contactNo: string;
      alternateContactNo: string;
      emergencyContactNo: string;
      adharNo: string;
      panNo: string;
      dob: string;
      gender: string;
      nationality: string;
      firstAddressLine1: string;
      firstAddressLine2: string;
      firstAddressLine3: string;
      correspondenceAddressLine1: string;
      correspondenceAddressLine2: string;
      correspondenceAddressLine3: string;
      religion: string;
      caste: string;
      category: string;
      motherTongue: string;
      speciallyChallenged: boolean;
      remarks: string;
      languages: string[];
      bankName: string;
      accountNo: string;
      accountName: string;
      accountType: string;
      branch: string;
      ifsc: string;
      pfNumber: string;
      uanNumber: string;
      pensionNumber: string;
      motherName: string;
      fatherName: string;
      children: string[];
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFacultyDetails() {
      try {
        const token = localStorage.getItem("token");
        const facultyId = token ? JSON.parse(token).facultyId : null;

        if (!facultyId) {
          notFound();
          return;
        }

        const response = await fetch(`/api/facultypersonaldetails`);
        if (!response.ok) {
          notFound();
          return;
        }

        const data = await response.json();
        setFacultyDetails(data);
      } catch (error) {
        console.error("Error fetching faculty details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFacultyDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!facultyDetails) {
    return <div>Faculty not found</div>;
  }

  return (
    <div>
      <NavLinks />
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="relative">
            <Image
              src={facultyDetails?.data.photo || ""}
              alt={`${facultyDetails?.data.firstName || ""} ${
                facultyDetails?.data.lastName || ""
              }`}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {facultyDetails.data.firstName} {facultyDetails.data.lastName}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Faculty ID</p>
                <p className="font-medium text-gray-800">
                  {facultyDetails.data.facultyId}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Designation</p>
                <p className="font-medium text-gray-800">
                  {facultyDetails.data.qualification}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium text-gray-800">
                  {facultyDetails.data.contactNo}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">
                  {facultyDetails.data.emailId || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Qualification</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.qualification || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Title</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.title || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Middle Name</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.middleName || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Alternate Contact No</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.alternateContactNo || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Emergency Contact No</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.emergencyContactNo || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Aadhar No</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.adharNo || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">PAN No</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.panNo || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.dob.split("T")[0] || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.gender || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Nationality</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.nationality || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">First Address Line 1</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.firstAddressLine1 || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">First Address Line 2</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.firstAddressLine2 || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">First Address Line 3</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.firstAddressLine3 || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Correspondence Address Line 1
              </p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.correspondenceAddressLine1 || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Correspondence Address Line 2
              </p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.correspondenceAddressLine2 || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Correspondence Address Line 3
              </p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.correspondenceAddressLine3 || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Religion</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.religion || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Caste</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.caste || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.category || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Mother Tongue</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.motherTongue || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Specially Challenged</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.speciallyChallenged ? "Yes" : "No"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Remarks</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.remarks || "N/A"}
              </p>
            </div>
            {/* <div className="space-y-1">
            <p className="text-sm text-gray-500">Languages</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.data.languages || "N/A"}
            </p>
          </div> */}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Bank Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Bank Name</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.bankName || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Account Name</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.accountName || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.accountType || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.accountNo || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Branch</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.branch || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">IFSC</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.ifsc || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">PF Number</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.pfNumber || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">UAN Number</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.uanNumber || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Pension Number</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.pensionNumber || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Family Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Mother's Name</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.motherName || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Father's Name</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.fatherName || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Spouse Name</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.spouseName || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Children</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.data.children.join(", ") || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
