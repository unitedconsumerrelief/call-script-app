// Call Flow v10
// Features:
// - Updated employment check script
// - Debt confirmation flow
// - State-based routing
// - Flow selection modal
// - Employment check integration
// - Dynamic debt entries
// - Debt amount warnings
// - Multi-language support (English/Spanish)

import React, { useState, useEffect, useCallback } from "react";

const languageOptions = {
  en: "English",
  es: "Español"
};

const flow = {
  start: {
    id: "start",
    label: "Introduction",
    script: "Good morning/afternoon! Thanks for calling the Debt Relief Center — this is [Agent Name]. How can we help you get a fresh start with your debts today?",
    options: [{ text: "Continue", next: "qualify" }]
  },
  qualify: {
    id: "qualify",
    label: "Qualification",
    script: "You've come to the right place. We can help reduce all of your debts, save you thousands of dollars, and even pay them off sooner than you thought. This allows you to have more money in your pockets for the things you really need, instead of paying interest and fees on these debts! Before we get started, can I please get your Name and the State you are calling from?",
    options: [
      { text: "Yes", next: "checkState" },
      { text: "No", next: "start" }
    ]
  },
  checkState: {
    id: "checkState",
    label: "Check State",
    script: "Which state do you reside in?",
    options: [
      { text: "Continue", next: "employmentCheck" }
    ]
  },
  employmentCheck: {
    id: "employmentCheck",
    label: "Employment Check",
    script: "To make sure we are getting you the highest debt removal program, we need to check some information before moving forward, can you please confirm that you are currently employed or receiving any income?",
    options: [
      { text: "Yes", next: "checkDebt" },
      { text: "No", next: "notQualified" }
    ]
  },
  checkDebt: {
    id: "checkDebt",
    label: "Check Debt Amount",
    script: "Ok great, now can you go over the different types of debt you have that you want to save money on? Remember we can save you 50% on these debts so please let me know the type of debt/who you owe, and how much you owe to them",
    options: [
      { text: "≥ $10,000", next: "debtConfirmation" },
      { text: "< $10,000", next: "consumerShieldFlow" }
    ]
  },
  debtConfirmation: {
    id: "debtConfirmation",
    label: "Debt Confirmation",
    script: "Ok congratulations! Looks like the types of debt we went over are all qualified for our program. Now we just do need to confirm these with the creditors, so we are going to get some more information from you and do a SOFT credit pull. This will not affect your credit in any way, it just lets me see the report so I can confirm all of the debts and then we're almost done!",
    options: [
      { text: "Continue", next: "addressConfirmation" }
    ]
  },
  addressConfirmation: {
    id: "addressConfirmation",
    label: "Address Confirmation",
    script: "First we're going to start with your home address, can you please spell out your address for me? Please also let me know if you have a suite or apartment number.",
    options: [
      { text: "Continue", next: "employmentConfirmation" }
    ]
  },
  employmentConfirmation: {
    id: "employmentConfirmation",
    label: "Employment Confirmation",
    script: "Ok now let's go over your employment. You said you're currently working, can you please give me the name of the company you are working for?\n\nThanks, and What is your position there, and how long have you worked there?\n\nPerfect! Do you have their address off of the top of your head? If not I can find it on the internet, don't worry!",
    options: [
      { text: "Continue", next: "ssnConfirmation" }
    ]
  },
  ssnConfirmation: {
    id: "ssnConfirmation",
    label: "SSN Confirmation",
    script: "Now the final step before we go ahead and confirm everything with the creditors, can I please have your social security number?",
    options: [
      { text: "Continue", next: "hardshipInformation" }
    ]
  },
  hardshipInformation: {
    id: "hardshipInformation",
    label: "Hardship Information",
    script: "Ok great thank you! Everything looks good here, I'm just going to go ahead and confirm all of these numbers we went over and then I'll be able to tell you exactly how many thousands of dollars you'll be saving.\n\nNow while I'm doing this, our teams what work with your debts will ask how come you don't want to pay the full amount, or how come you are unable to pay the full amount? This can be because you are not getting paid enough at your job, maybe you had some medical expenses, even car expenses or home expenses rising can be a reason. Can you please give me what I should put here as an explanation?",
    options: [
      { text: "Continue", next: "accountConfirmation" }
    ]
  },
  accountConfirmation: {
    id: "accountConfirmation",
    label: "Account Confirmation",
    script: "Ok we have all of the information we need, let me just confirm these accounts with you one last time.",
    note: "Review item lines one by one and ensure they are valid for our programs. Refer to the MASTER GUIDE",
    options: [
      { text: "Continue", next: "paymentSummary" }
    ]
  },
  paymentSummary: {
    id: "paymentSummary",
    label: "Payment Summary",
    script: "So it looks like for your bills, you are currently paying $XXX.XX for all of these debts every month, and we can bring this down to $YYY.YY. That's not all, we are also going to make sure that instead of Z years of making your payments, you will be fully paying off these debts in just XX months (or X years).\n\nYou're saving thousands of dollars overall, and you're going to be debt free very soon - how does that sound to you?",
    note1: "If there are items not on the credit report that the person has mentioned, we need them to send us the latest statement.",
    note2: "If they prefer, we can push to semi-monthly payments instead",
    options: [
      { text: "Continue", next: "backEndSelection" }
    ]
  },
  backEndSelection: {
    id: "backEndSelection",
    label: "Back-End Selection",
    script: "If you're ready to move forward, I will be reading some explanations to you so you fully understand our program, and also needed for a quality check from our team that will be contacting you and the people you owe money to",
    options: [
      { text: "Elevate", next: "programExplanation" },
      { text: "Clarity", next: "programExplanation" }
    ]
  },
  programExplanation: {
    id: "programExplanation",
    label: "Program Explanation",
    script: "I am going to start explaining, and please let me know if you have any questions. We offer a program called \"Debt Settlement\" which is where we have a team that works for you, and speaks to the people you owe money to on your behalf.  \n\nWe will provide you with all of the documents that inform the people you owe money to to not contact you anymore, and instead they will be contacting our team. If they ever do contact you, you will tell them to contact us instead and you do not need to provide them with any explanations.\n\nWe will be setting up a \"Trust\" account for you, which is in your name, and instead of paying the people you owe money to, you will be putting the money in your Trust account. Aside from any fees, rest assured that this is all of your money.",
    options: [
      { text: "Continue", next: "budgetAnalysis" }
    ]
  },
  budgetAnalysis: {
    id: "budgetAnalysis",
    label: "Budget Analysis",
    script: "Our team develops a Settlement Plan with your creditors, and once your term is complete, the money gets sent to your creditors and the account is closed, you will not owe any additional money to them.\n\nDo you have any questions?\n\nOk great, I also want you to understand that our teams have been doing this for years and have saved Americans like you millions of dollars, and there is no other program like ours.\n\nWith our payment plan, we just need to review your budget plan to make sure you are comfortable with the payments, can we go over this?",
    options: [
      { text: "Continue", next: "softCreditPull" }
    ]
  }
};

// State-based routing configuration
const stateVendorMap = {
  'OR': 'Elevate_FSP',
  'WA': 'Clarity',
  'WI': 'Clarity'
  // Add other states as needed
};

const stateAttorneyMap = {
  'WA': 'Washington Attorney',
  'WI': 'Wisconsin Attorney'
  // Add other states as needed
};

const unsupportedStates = [
  // Add unsupported states here
];

const stateNotes = {
  // Add state-specific notes here
};

// Debt type configurations
const debtTypes = [
  "Credit Cards",
  "Medical Bills",
  "Personal Loans",
  "Private Student Loans",
  "Other"
];

const unacceptableDebtTypes = [
  "Federal Student Loans",
  "Tax Debt",
  "Child Support",
  "Alimony",
  "Secured Loans"
];

// Export the configuration
export {
  languageOptions,
  flow,
  stateVendorMap,
  stateAttorneyMap,
  unsupportedStates,
  stateNotes,
  debtTypes,
  unacceptableDebtTypes
}; 