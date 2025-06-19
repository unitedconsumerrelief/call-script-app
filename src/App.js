import React, { useState, useEffect, useCallback } from "react";

const languageOptions = {
  en: "English",
  es: "Español"
};

const objectionMap = {
  "Concerns about the price being too high": "I understand pricing is a concern. But you will not find another program where the monthly is this low, and in the end, saves you thousands. The amount of interest you're currently paying far outweighs what this program costs.",
  "Doubts about the effectiveness of the program": "It's important you feel confident in what we're offering. This program is accredited, used nationwide, and has helped thousands get out of debt quickly. We wouldn't be here if it didn't work.",
  "Need for more time to think about the purchase": "That makes sense — it's a big decision. But the longer you wait, the more interest and penalties you're paying. Starting today stops that clock and gets you moving toward freedom.",
  "Concerns about the impact on credit score during negotiation": "That's a great question! You are investing in yourself and your future. Your credit score will start increasing as soon as we begin your program. Most clients even reach 750+ scores as we eliminate debt and reduce your overall burden.",
  "Questioning the legitimacy of the program and company": "Somos un programa acreditado por el gobierno con acceso a todos los principales acreedores. Tenemos miles de reseñas y resultados comprobados. Está en buenas manos y lo guiaremos en cada paso del camino.",
  "Uncertainty about the payment plan and total debt amount": "That's a fair question. Let's break it down: how much you owe, how much you'll pay monthly, and how long it takes. We'll make every detail clear. No interest, no extra fees — just progress.",
  "Customer is not ready to commit due to financial constraints": "Totally understandable. If you're tight on funds, we can still find a way. Our goal is to eliminate your debt, not add more stress. We can explore plans with lower monthly payments or deferred start options.",
  "Customer prioritizes paying off their house over other debts": "Your home comes first and families well being comes first and we respect that. Our plan won't interfere with your mortgage. We will be working on the tens of thousands of dollars that you can put towards your house payments or groceries or anything else you may need.",
  "Customer is hesitant about the program's impact on their credit score": "Your credit report is VERY important and listen closely to what we will do for you. What we're doing is helping you eliminate debts that is destroying your credit score by bringing it down. As we eliminate your debts off your record, your credit gets stronger.",
  "Uncertainty about debts and financial situation.": "I completely understand, remember having debt further lowers your credit score which makes it impossible to ever receive extra money in case of an emergency or buy things like renting or purchasing a house, a car or many other necessities.",
  "Medical Debt from Hospital Visits": "We work with medical providers as well and can consolidate or reduce your hospital debt — often by 50% or more. Let's check what we can do for you.",
  "Vehicle Repossession Concern": "Even if your vehicle was repossessed or at risk, we can help. Our program may address those debts and negotiate on your behalf to reduce damage to your credit and prevent further issues.",
  "Insurance-Related Debt Inquiry": "Whether it's auto, health, or another type of insurance-related debt, we can look into those balances and see what's eligible for negotiation or consolidation through our program.",
  "Income or Debt Status Due to Disability": "Thanks for sharing that you're receiving disability income. We understand how important it is to work within a fixed budget. We can look into plans that accommodate your income and help relieve financial pressure.",
  "Tax Debt or Refund-Based Discussion": "If you're carrying tax-related debt, we can help. We work with individuals who owe back taxes or are trying to settle IRS obligations. I can walk you through what support might be available for your specific case.",
  "Customer Reporting Identity Theft or Fraud": "I'm really sorry to hear you've had issues with fraud. It's important we handle this carefully. I can note the impacted accounts and help you work through legitimate debts only, while advising you on next steps to protect your credit.",
  "Request for More Information or Clarification": "Of course — I'd be happy to clarify. Is there anything specific you'd like more information on, or should I walk you through how the program works from the top?",
  "Customer Wants to Pay Less / Lower Monthly": "Your payments lessen as we clear your debts. Don't forget we're wiping away all your interest payments and decreasing your debt to 50% of what you owed. Use the program. One of the best things I want you to focus on is, you will become debt free quicker, have more freedom in the process and be able to shoot up your credit score as we remove these debts.",
  "Hesitation Due to Sharing Personal Info": "I completely understand being cautious with your personal information. Keep in mind, this is ONLY used to see the debts you have and how we can save you. We are NOT doing a hard credit pull like credit card companies do, because we don't want to hurt your score. We only use secure encrypted information to assist you. This will not hurt your credit score and your information will never be sold.",
  "Student Loan Relief Eligibility": "I see you may have student loans. While we don't always work directly with federal loans, we can look at any private loans or other unsecured debts to help ease your financial situation.",
  "Divorce or Separation-Related Debt": "Going through a divorce often means dealing with shared financial responsibilities. We can help identify which debts you're responsible for and build a plan that fits your new circumstances.",
  "Relocation-Related Financial Stress": "Relocating can be overwhelming, especially when you're trying to stay afloat. Let's look at how we can help streamline your financial obligations so that the move doesn't come with unnecessary financial strain.",
  "Overdue Utility Bills": "Overdue utility bills can be stressful, especially when you're trying to stay afloat. Let's look at how we can reduce your financial pressure and avoid any disruption in your essential services.",
  "Rental Payment Issues": "Rent is one of the most important priorities, and we understand that. Our role is to help free up more of your monthly income by lowering or eliminating your other debt payments."
};

const translatedObjectionMap = {
  "Concerns about the price being too high": "Entiendo que el precio puede ser una preocupación. Pero no encontrará otro programa con una cuota mensual tan baja que además le ahorre miles. Los intereses que paga actualmente superan con creces el costo de este programa.",
  "Doubts about the effectiveness of the program": "Es importante que se sienta seguro con lo que ofrecemos. Este programa está acreditado, se utiliza a nivel nacional y ha ayudado a miles a salir de deudas rápidamente. No estaríamos aquí si no funcionara.",
  "Need for more time to think about the purchase": "Tiene sentido — es una decisión importante. Pero cuanto más espere, más intereses y sanciones pagará. Comenzar hoy detiene ese reloj y lo acerca a la libertad financiera.",
  "Concerns about the impact on credit score during negotiation": "¡Esa es una excelente pregunta! Está invirtiendo en usted y en su futuro. Su puntaje de crédito comenzará a aumentar tan pronto como iniciemos su programa. La mayoría de nuestros clientes incluso alcanzan puntajes superiores a 750, ya que eliminamos deudas y reducimos su carga financiera.",
  "Questioning the legitimacy of the program and company": "Somos un programa acreditado por el gobierno con acceso a todos los principales acreedores. Tenemos miles de reseñas y resultados comprobados. Está en buenas manos y lo guiaremos en cada paso del camino.",
  "Uncertainty about the payment plan and total debt amount": "Esa es una excelente pregunta. Vamos a desglosarlo: cuánto debe, cuánto pagará mensualmente y cuánto tiempo tomará. Le explicaremos todo con claridad. Sin intereses, sin cargos extra — solo progreso.",
  "Customer is not ready to commit due to financial constraints": "Totalmente comprensible. Si tiene poco presupuesto, aún podemos encontrar una solución. Nuestro objetivo es eliminar sus deudas, no añadir más estrés. Podemos explorar planes con pagos mensuales más bajos o comenzar más adelante.",
  "Customer prioritizes paying off their house over other debts": "Su hogar y su familia son lo primero, y lo respetamos. Nuestro plan no interfiere con su hipoteca. Vamos a trabajar en las decenas de miles de dólares que podrá redirigir hacia su casa o necesidades básicas como alimentos.",
  "Customer is hesitant about the program's impact on their credit score": "Su historial crediticio es MUY importante. Lo que hacemos es eliminar las deudas que están perjudicando su puntaje. Al eliminarlas de su reporte, su crédito se fortalece.",
  "Uncertainty about debts and financial situation.": "Lo entiendo completamente. Tener deudas baja aún más su crédito, lo que hace casi imposible obtener ayuda financiera en caso de emergencia o acceder a cosas como una casa o un auto.",
  "Medical Debt from Hospital Visits": "También trabajamos con proveedores médicos y podemos consolidar o reducir sus deudas hospitalarias — a menudo en un 50% o más. Veamos qué podemos hacer.",
  "Vehicle Repossession Concern": "Incluso si su vehículo fue embargado o está en riesgo, podemos ayudarle. Nuestro programa puede abordar esas deudas y negociar en su nombre para reducir el daño a su crédito y evitar más problemas.",
  "Insurance-Related Debt Inquiry": "Ya sea deuda de seguros de auto, salud u otro tipo, podemos revisar esos saldos y ver si son elegibles para negociación o consolidación.",
  "Income or Debt Status Due to Disability": "Gracias por compartir que recibe ingresos por discapacidad. Sabemos lo importante que es ajustarse a un presupuesto fijo. Podemos buscar planes adaptados a su situación y aliviar la presión financiera.",
  "Tax Debt or Refund-Based Discussion": "Si tiene deudas relacionadas con impuestos, podemos ayudarle. Trabajamos con personas que deben impuestos atrasados o necesitan resolver obligaciones con el IRS. Le explicaré qué apoyo está disponible.",
  "Customer Reporting Identity Theft or Fraud": "Lamento mucho que haya tenido problemas de fraude. Es vital manejar esto con cuidado. Puedo registrar las cuentas afectadas y ayudarle a enfocarnos solo en deudas legítimas, además de asesorarle para proteger su crédito.",
  "Request for More Information or Clarification": "Por supuesto — con gusto le explico. ¿Hay algo en particular sobre lo que quiera más información o desea que le explique el programa desde el principio?",
  "Customer Wants to Pay Less / Lower Monthly": "Sus pagos disminuyen a medida que eliminamos sus deudas. Recuerde que eliminamos todos los intereses y reducimos su deuda al 50%. El programa le ayudará a salir de deudas más rápido, tener más libertad y mejorar su puntaje crediticio.",
  "Hesitation Due to Sharing Personal Info": "Entiendo completamente que sea precavido con su información personal. Esta solo se usa para ver sus deudas y cómo podemos ayudarle. No hacemos consultas de crédito duras, y su información está segura y cifrada. Esto no afectará su puntaje crediticio y nunca se venderá.",
  "Student Loan Relief Eligibility": "Veo que tiene préstamos estudiantiles. Aunque no siempre trabajamos con préstamos federales, podemos revisar préstamos privados u otras deudas no garantizadas para aliviar su situación financiera.",
  "Divorce or Separation-Related Debt": "Pasar por un divorcio implica responsabilidades financieras compartidas. Podemos ayudarle a identificar qué deudas le corresponden y crear un plan acorde a su nueva situación.",
  "Relocation-Related Financial Stress": "Mudarse puede ser abrumador, especialmente si tiene deudas. Veamos cómo podemos simplificar sus obligaciones para que la mudanza no cause más estrés financiero.",
  "Overdue Utility Bills": "Las facturas de servicios vencidas son estresantes. Podemos ayudarle a reducir esa presión financiera y evitar interrupciones en servicios esenciales.",
  "Rental Payment Issues": "Pagar la renta es una prioridad. Nuestro objetivo es liberar más ingresos mensuales para usted, reduciendo o eliminando otros pagos de deuda."
};

const translatedObjectionTitles = {
  "Concerns about the price being too high": "Preocupaciones sobre el precio alto",
  "Doubts about the effectiveness of the program": "Dudas sobre la efectividad del programa",
  "Need for more time to think about the purchase": "Necesita más tiempo para pensar",
  "Concerns about the impact on credit score during negotiation": "Preocupaciones sobre el puntaje crediticio",
  "Questioning the legitimacy of the program and company": "Duda sobre la legitimidad del programa",
  "Uncertainty about the payment plan and total debt amount": "Incertidumbre sobre pagos y deuda total",
  "Customer is not ready to commit due to financial constraints": "No puede comprometerse por restricciones financieras",
  "Customer prioritizes paying off their house over other debts": "Prioriza pagar la hipoteca",
  "Customer is hesitant about the program's impact on their credit score": "Duda del impacto en su crédito",
  "Uncertainty about debts and financial situation.": "Incertidumbre sobre su situación financiera",
  "Medical Debt from Hospital Visits": "Deuda médica por hospital",
  "Vehicle Repossession Concern": "Preocupación por embargo vehicular",
  "Insurance-Related Debt Inquiry": "Consulta sobre deudas de seguros",
  "Income or Debt Status Due to Disability": "Situación de ingreso o deuda por discapacidad",
  "Tax Debt or Refund-Based Discussion": "Discusión sobre deuda tributaria o reembolsos",
  "Customer Reporting Identity Theft or Fraud": "Reporta robo de identidad o fraude",
  "Request for More Information or Clarification": "Solicita más información o aclaración",
  "Customer Wants to Pay Less / Lower Monthly": "Quiere pagar menos / menos mensualidad",
  "Hesitation Due to Sharing Personal Info": "Duda por compartir información personal",
  "Student Loan Relief Eligibility": "Elegibilidad para alivio de préstamos estudiantiles",
  "Divorce or Separation-Related Debt": "Deuda relacionada con divorcio o separación",
  "Relocation-Related Financial Stress": "Estrés financiero por mudanza",
  "Overdue Utility Bills": "Facturas de servicios vencidas",
  "Rental Payment Issues": "Problemas con el pago del alquiler"
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
      { text: "Continue", next: "employmentCheck" }
    ]
  },
  employmentCheck: {
    id: "employmentCheck",
    label: "Employment Check",
    script: "Are you currently employed or do you have a stable source of income? This is important because we need to make sure you can make the monthly payments for the program.",
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
    script: "First we're going to start with your home address, can you please spell out your address for me? Please also let me know if you have a suite or apartment number.\n\nGreat, now I also have your phone number as (repeat phone number they are calling from), is this the best number to reach you at?\n\nAnd can I please get an email address as well?",
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
    script: "I am going to start explaining, and please let me know if you have any questions. We offer a program called 'Debt Settlement' which is where we have a team that works for you, and speaks to the people you owe money to on your behalf.\n\nWe will provide you with all of the documents that inform the people you owe money to to not contact you anymore, and instead they will be contacting our team. If they ever do contact you, you will tell them to contact us instead and you do not need to provide them with any explanations.\n\nWe will be setting up a 'Trust' account for you, which is in your name, and instead of paying the people you owe money to, you will be putting the money in your Trust account. Aside from any fees, rest assured that this is all of your money.",
    options: [
      { text: "Continue", next: "budgetAnalysis" }
    ]
  },
  budgetAnalysis: {
    id: "budgetAnalysis",
    label: "Budget Analysis",
    script: "Our team develops a Settlement Plan with your creditors, and once your term is complete, the money is sent to your creditors and the account is closed, you will not owe them any additional money.\n\nDo you have any questions?\n\nPerfect, I also want you to understand that our teams have been doing this for years and have saved millions of dollars for Americans like you, and there is no other program like ours.\n\nWith our payment plan, we just need to review your budget plan to make sure you are comfortable with the payments, can we review this?",
    options: [
      { text: "Continue", next: "bankingInformation" }
    ]
  },
  bankingInformation: {
    id: "bankingInformation",
    label: "Banking Information",
    script: "Since the next step now is to stop paying your creditors, we are going to be setting up your trust account. You will also be getting an online account so you can see all of the activity with the money you will be putting towards these settlements. To start, we need to have your banking information.\n\nDo you know how to get your Routing and Account number? If not, I can help you find this.",
    options: [
      { text: "Yes", next: "bankingReady" },
      { text: "No", next: "bankingHelp" }
    ]
  },
  bankingReady: {
    id: "bankingReady",
    label: "Banking Ready",
    script: "Ok let me know whenever you have this ready",
    options: [
      { text: "Continue", next: "scheduledFirstPayment" }
    ]
  },
  bankingHelp: {
    id: "bankingHelp",
    label: "Banking Help",
    script: "Ok, do you have the mobile app for your bank? Which bank is it?\n\n*we need to have instructions for all major banks* → ChatGPT",
    options: [
      { text: "Continue", next: "scheduledFirstPayment" }
    ]
  },
  scheduledFirstPayment: {
    id: "scheduledFirstPayment",
    label: "Scheduled First Payment and Frequency",
    script: "Ok great, now what I'll do for you here is I can push your first payment out for about a week so you have time to get your money in order. Does ________ work for you.",
    note: "Reminder, should be min 7 days out, and max 30 days out unless otherwise noted",
    options: [
      { text: "Continue", next: "complianceQuestions" }
    ]
  },
  complianceQuestions: {
    id: "complianceQuestions",
    label: "Compliance Questions Asked and Recorded",
    script: "I'm so happy we could work together to save you thousands of dollars. Again this is more money that will be yours to spend on whatever you want or need.\n\nNow I have to do our compliance call. This just means that you I have to ask you some questions to make sure you fully understand our program and agree to work with us, but if you have any questions, you can ask. Sorry in advance, it might take a few minutes to finish all of these questions",
    options: [
      { text: "Continue", next: "correctPackageSelected" }
    ]
  },
  correctPackageSelected: {
    id: "correctPackageSelected",
    label: "Correct Package was selected, and SMS sent",
    script: "Thank you so much for that! Now I'm going to send you a message to your phone, it will have our contract in it, and you will see all of the details there, and all of your payments. You can just click on the link when you see it, and click the buttons to sign. If you have any questions, let me know and I can help",
    options: [
      { text: "Continue", next: "contractSignedByClient" }
    ]
  },
  contractSignedByClient: {
    id: "contractSignedByClient",
    label: "Contract signed by client",
    script: "Ok I just received the note that you signed this, thank you!\n\nIf I were you, I would save this number in your phone so you know when they call in case you miss it, you can call them back. The phone number is 561-763-8380, and they are open 6AM to 3PM Pacific Time",
    note: "If Elevate: So what's going to happen now is our managing team is going to give you a call within 24 hours just to introduce themselves and say Hi, and you can ask them any questions you might have. They are also going to give you the details on how to see all of your payments online if you want to.",
    options: [
      { text: "Continue", next: "softCreditPull" }
    ]
  },
  softCreditPull: {
    id: "softCreditPull",
    label: "Soft Credit Pull",
    script: "We will now do a soft-credit pull as required by the program. This may or may not affect your credit score, but you can rest assured that going through the program will yield more benefits than any temporary impact. In fact, many of our clients see their credit improve over time as their debt decreases and accounts are settled.",
    options: [
      { text: "Continue", next: "checkDebt" }
    ]
  },
  consumerShieldFlow: {
    id: "consumerShieldFlow",
    label: "Consumer Shield Program",
    script: "Based on your debt amount, you may qualify for the Consumer Shield program. This program is designed for clients with $5,550 or more in enrolled debt, a minimum payment of $220/month, and a plan term of 24 months (under $8,800) or 36 months (over $8,800). All enrolled accounts must have a balance of at least $200. The initial payment must be within 18 days of enrollment. Would you like to proceed with the qualification process?",
    options: [
      { text: "Yes", next: "consumerShieldSoftCreditPull" },
      { text: "No", next: "start" }
    ]
  },
  consumerShieldSoftCreditPull: {
    id: "consumerShieldSoftCreditPull",
    label: "Consumer Shield Soft Credit Pull",
    script: "Thanks for confirming, we will now do a soft-credit pull as required by the Consumer Shield program. This may or may not affect your credit score, but you can rest assured that going through the program will yield more benefits than any temporary impact. Would you like to continue?",
    options: [
      { text: "Continue", next: "consumerShieldCheckState" }
    ]
  },
  consumerShieldCheckState: {
    id: "consumerShieldCheckState",
    label: "Consumer Shield State Check",
    script: "Which state do you reside in? (Consumer Shield is not available in CO, PA, NJ, OR)",
    options: [
      { text: "Continue", next: "consumerShieldQualified" }
    ]
  },
  consumerShieldQualified: {
    id: "consumerShieldQualified",
    label: "Consumer Shield Qualified",
    script: "Great news! Based on what you've shared, you qualify for the Consumer Shield program. Let me explain how it works...",
    options: [
      { text: "Start Over", next: "start" }
    ]
  },
  consumerShieldNotQualified: {
    id: "consumerShieldNotQualified",
    label: "Consumer Shield Not Qualified",
    script: "I apologize, but based on the information provided, you do not qualify for the Consumer Shield program. Here are some alternative resources that might help...",
    options: [
      { text: "Start Over", next: "start" }
    ]
  },
  selectedFlow: {
    id: "selectedFlow",
    label: "Selected Flow",
    script: (state) => {
      const vendor = stateVendorMap[state];
      if (vendor === 'Elevate_FSP') {
        return "Great news! Based on your state, you'll be working with Elevate Finance, LLC. They offer a comprehensive debt relief program with a 27% fee structure.";
      } else if (vendor === 'Clarity') {
        return `Excellent! Based on your state, you'll be working with ${stateAttorneyMap[state]}. This is a Clarity attorney-backed program with a 27% fee structure${state === 'CO' ? ' (Note: Fresh Start Plan add-on is not available in Colorado)' : ''}.`;
      }
      return "Proceeding with your selected program...";
    },
    options: [
      { text: "Continue", next: "checkingAccount" }
    ]
  },
  checkingAccount: {
    id: "checkingAccount",
    label: "Checking Account",
    script: "Do you have a checking account in your name?",
    options: [
      { text: "Yes", next: "qualified" },
      { text: "No", next: "notQualified" }
    ]
  },
  qualified: {
    id: "qualified",
    label: "Qualified",
    script: "Great news! Based on what you've shared, you qualify for our debt relief program. Let me explain how it works...",
    options: [
      { text: "Start Over", next: "start" }
    ]
  },
  notQualified: {
    id: "notQualified",
    label: "Not Qualified",
    script: "I apologize, but based on the information provided, we cannot assist with your current situation. Here are some alternative resources that might help...",
    options: [
      { text: "Start Over", next: "start" }
    ]
  },
  disqualifier: {
    id: "disqualifier",
    label: "Disqualified - Unsupported Debt Type",
    script: "I understand you have debt related to [Debt Type]. Unfortunately, we are not able to assist with this type of debt due to legal and program restrictions. However, I can provide you with some alternative resources that might be helpful for your situation.",
    options: [
      { text: "Start Over", next: "start" },
      { text: "Check Other Debt", next: "checkDebt" }
    ]
  },
  loanReferral: {
    id: "loanReferral",
    label: "Loan Referral",
    script: "I understand you're looking for a loan. While we don't provide loans directly, we can help you understand your options and potentially improve your chances of approval through debt relief. Would you like to hear more about how our program could help?",
    options: [
      { text: "Yes", next: "qualify" },
      { text: "No", next: "start" }
    ]
  },
  debtConsolidation: {
    id: "debtConsolidation",
    label: "Debt Consolidation",
    script: "Our debt relief program is often more effective than traditional consolidation. Instead of taking on new debt, we negotiate with your creditors to reduce what you owe. Would you like to learn more about how this works?",
    options: [
      { text: "Yes", next: "qualify" },
      { text: "No", next: "start" }
    ]
  },
  creditRepair: {
    id: "creditRepair",
    label: "Credit Repair",
    script: "While we don't offer direct credit repair services, our debt relief program naturally helps improve your credit score by reducing your debt burden and establishing positive payment history. Would you like to learn more?",
    options: [
      { text: "Yes", next: "qualify" },
      { text: "No", next: "start" }
    ]
  },
  bankruptcy: {
    id: "bankruptcy",
    label: "Bankruptcy",
    script: "Before considering bankruptcy, let's explore if our debt relief program could help. We may be able to reduce your debt significantly without the long-term consequences of bankruptcy. Would you like to learn more?",
    options: [
      { text: "Yes", next: "qualify" },
      { text: "No", next: "start" }
    ]
  },
  elevateFSPFlow: {
    id: "elevateFSPFlow",
    label: "Elevate Finance Program",
    script: "Great news! Based on your state, you'll be working with Elevate Finance, LLC. They offer a comprehensive debt relief program with a 27% fee structure. Would you like to proceed with the qualification process?",
    options: [
      { text: "Yes", next: "softCreditPull" },
      { text: "No", next: "start" }
    ]
  },
  clarityFlow: {
    id: "clarityFlow",
    label: "Clarity Attorney-Backed Program",
    script: (state) => `Excellent! Based on your state, you'll be working with ${stateAttorneyMap[state]}. This is a Clarity attorney-backed program with a 27% fee structure${state === 'CO' ? ' (Note: Fresh Start Plan add-on is not available in Colorado)' : ''}. Would you like to proceed with the qualification process?`,
    options: [
      { text: "Yes", next: "softCreditPull" },
      { text: "No", next: "start" }
    ]
  },
};

const translatedFlow = {
  start: {
    id: "start",
    label: "Introducción",
    script: "Buenos días/tardes, gracias por llamar a United Consumer Relief. Le habla [Nombre del Agente]. ¿Cómo puedo ayudarle hoy?",
    options: [{ text: "Continuar", next: "qualify" }]
  },
  qualify: {
    id: "qualify",
    label: "Calificación",
    script: "Ha llegado al lugar correcto. ¿Puedo hacerle algunas preguntas rápidas para verificar si califica?",
    options: [
      { text: "Continuar", next: "employmentCheck" }
    ]
  },
  employmentCheck: {
    id: "employmentCheck",
    label: "Verificación de Empleo",
    script: "¿Está empleado actualmente o tiene una fuente estable de ingresos? Esto es importante ya que necesitamos asegurarnos de que pueda hacer los pagos mensuales para el programa.",
    options: [
      { text: "Yes", next: "checkDebt" },
      { text: "No", next: "notQualified" }
    ]
  },
  checkDebt: {
    id: "checkDebt",
    label: "Verificar Monto de Deuda",
    script: "Ok great, ahora puede pasar por las diferentes clases de deuda que tiene para ahorrar dinero. Recuerde que podemos ahorrarle el 50% en estas deudas, así que por favor háganme saber el tipo de deuda/a quién le debe, y cuánto le debe a ellos",
    options: [
      { text: "≥ $10,000", next: "debtConfirmation" },
      { text: "< $10,000", next: "consumerShieldFlow" }
    ]
  },
  debtConfirmation: {
    id: "debtConfirmation",
    label: "Confirmación de Deuda",
    script: "¡Felicitaciones! Parece que los tipos de deuda que revisamos califican para nuestro programa. Ahora solo necesitamos confirmar esto con los acreedores, así que vamos a obtener más información de usted y hacer una verificación de crédito SUAVE. Esto no afectará su crédito de ninguna manera, solo me permite ver el informe para confirmar todas las deudas y ¡casi terminamos!",
    options: [
      { text: "Continue", next: "addressConfirmation" }
    ]
  },
  addressConfirmation: {
    id: "addressConfirmation",
    label: "Confirmación de Dirección",
    script: "Primero vamos a comenzar con su dirección de casa, ¿podría deletrearme su dirección? Por favor, también indíqueme si tiene un número de suite o apartamento.\n\nExcelente, también tengo su número de teléfono como (repetir número de teléfono desde el que están llamando), ¿es este el mejor número para contactarle?\n\n¿Y podría proporcionarme una dirección de correo electrónico también?",
    options: [
      { text: "Continue", next: "employmentConfirmation" }
    ]
  },
  employmentConfirmation: {
    id: "employmentConfirmation",
    label: "Confirmación de Empleo",
    script: "Ahora vamos a revisar su empleo. Dijo que actualmente está trabajando, ¿podría decirme el nombre de la empresa para la que trabaja?\n\nGracias, y ¿cuál es su cargo allí y cuánto tiempo ha trabajado allí?\n\n¡Perfecto! ¿Tiene su dirección de memoria? Si no, puedo encontrarla en internet, ¡no se preocupe!",
    options: [
      { text: "Continue", next: "ssnConfirmation" }
    ]
  },
  ssnConfirmation: {
    id: "ssnConfirmation",
    label: "Confirmación de SSN",
    script: "Ahora el paso final antes de proceder y confirmar todo con los acreedores, ¿podría proporcionarme su número de seguro social?",
    options: [
      { text: "Continue", next: "hardshipInformation" }
    ]
  },
  hardshipInformation: {
    id: "hardshipInformation",
    label: "Información de Dificultad",
    script: "¡Ok, muchas gracias! Todo se ve bien aquí, voy a confirmar todos estos números que revisamos y luego podré decirte exactamente cuántos miles de dólares estarás ahorrando.\n\nMientras hago esto, nuestros equipos que trabajan con sus deudas preguntarán por qué no quiere pagar el monto completo, o por qué no puede pagar el monto completo. Esto puede ser porque no está ganando lo suficiente en su trabajo, tal vez tuvo algunos gastos médicos, incluso los gastos del automóvil o del hogar pueden ser una razón. ¿Podría decirme qué debo poner aquí como explicación?",
    options: [
      { text: "Continue", next: "accountConfirmation" }
    ]
  },
  accountConfirmation: {
    id: "accountConfirmation",
    label: "Confirmación de Cuenta",
    script: "Ok, ya tenemos toda la información que necesitamos, permítame confirmar estas cuentas contigo una vez más.",
    note: "Revise cada línea uno por uno y asegúrese de que sean válidas para nuestros programas. Consulte la GUÍA MAESTRA",
    options: [
      { text: "Continue", next: "paymentSummary" }
    ]
  },
  paymentSummary: {
    id: "paymentSummary",
    label: "Resumen de Pago",
    script: "Entonces, parece que para sus facturas, actualmente está pagando $XXX.XX por todas estas deudas cada mes, y podemos bajar esto a $YYY.YY. Eso no es todo, también vamos a asegurarnos de que en lugar de Z años de hacer sus pagos, se pagarán estas deudas en solo XX meses (o X años).\n\nEstás ahorrando miles de dólares en total, y pronto estarás libre de deudas - ¿qué te parece eso?",
    note1: "Si hay elementos no informados en el informe de crédito que la persona ha mencionado, necesitamos que nos envíen el último estado.",
    note2: "Si prefieren, podemos pasar a pagos semimestrales en su lugar",
    options: [
      { text: "Continuar", next: "backEndSelection" }
    ]
  },
  backEndSelection: {
    id: "backEndSelection",
    label: "Selección Final",
    script: "Si está listo para avanzar, leeremos algunas explicaciones para usted para que entienda completamente nuestro programa, y también es necesario para una revisión de calidad de nuestro equipo que se comunicará con usted y con las personas a las que le debe dinero",
    options: [
      { text: "Elevate", next: "programExplanation" },
      { text: "Clarity", next: "programExplanation" }
    ]
  },
  programExplanation: {
    id: "programExplanation",
    label: "Explicación del Programa",
    script: "Voy a comenzar a explicar, y por favor hágamelo saber si tiene alguna pregunta. Ofrecemos un programa llamado 'Liquidación de Deuda', en el que tenemos un equipo que trabaja para usted y habla con las personas a las que les debe dinero en su nombre.\n\nLe proporcionaremos todos los documentos que informan a las personas a las que les debe dinero que no lo contacten más, y en su lugar se comunicarán con nuestro equipo. Si alguna vez lo contactan, les dirá que se comuniquen con nosotros y no necesita darles ninguna explicación.\n\nLe configuraremos una cuenta fiduciaria ('Trust') a su nombre, y en lugar de pagar a las personas a las que les debe dinero, pondrá el dinero en su cuenta fiduciaria. Aparte de cualquier tarifa, tenga la seguridad de que todo ese dinero es suyo.",
    options: [
      { text: "Continue", next: "budgetAnalysis" }
    ]
  },
  budgetAnalysis: {
    id: "budgetAnalysis",
    label: "Análisis de Presupuesto",
    script: "Nuestro equipo desarrolla un Plan de Liquidación con sus acreedores, y una vez que su plazo se complete, el dinero se envía a sus acreedores y la cuenta se cierra, no deberá dinero adicional a ellos.\n\n¿Tiene alguna pregunta?\n\nPerfecto, también quiero que entienda que nuestros equipos han estado haciendo esto durante años y han ahorrado millones de dólares a estadounidenses como usted, y no hay otro programa como el nuestro.\n\nCon nuestro plan de pagos, solo necesitamos revisar su plan de presupuesto para asegurarnos de que esté cómodo con los pagos, ¿podemos revisar esto?",
    options: [
      { text: "Continue", next: "bankingInformation" }
    ]
  },
  bankingInformation: {
    id: "bankingInformation",
    label: "Información Bancaria",
    script: "Dado que el siguiente paso ahora es dejar de pagar a sus acreedores, vamos a estar configurando su cuenta fiduciaria. También estará obteniendo una cuenta en línea para que pueda ver toda la actividad con el dinero que estará destinado a estos acuerdos. Para empezar, necesitamos tener su información bancaria.\n\n¿Conoce cómo obtener su número de ruta y número de cuenta? Si no, puedo ayudarlo a encontrar esto.",
    options: [
      { text: "Yes", next: "bankingReady" },
      { text: "No", next: "bankingHelp" }
    ]
  },
  bankingReady: {
    id: "bankingReady",
    label: "Listo para Bancar",
    script: "Ok, déjame saber cada vez que esté listo",
    options: [
      { text: "Continue", next: "scheduledFirstPayment" }
    ]
  },
  bankingHelp: {
    id: "bankingHelp",
    label: "Ayuda Bancaria",
    script: "Ok, ¿tiene la aplicación móvil de su banco? ¿De qué banco se trata?\n\n*necesitamos instrucciones para todos los principales bancos* → ChatGPT",
    options: [
      { text: "Continue", next: "scheduledFirstPayment" }
    ]
  },
  scheduledFirstPayment: {
    id: "scheduledFirstPayment",
    label: "Scheduled First Payment and Frequency",
    script: "Ok great, now what I'll do for you here is I can push your first payment out for about a week so you have time to get your money in order. Does ________ work for you.",
    note: "Reminder, should be min 7 days out, and max 30 days out unless otherwise noted",
    options: [
      { text: "Continue", next: "complianceQuestions" }
    ]
  },
  complianceQuestions: {
    id: "complianceQuestions",
    label: "Preguntas de Cumplimiento Realizadas y Registradas",
    script: "Estoy muy feliz de que pudiéramos trabajar juntos para ahorrarle miles de dólares. Nuevamente, este es más dinero que será suyo para gastar en lo que quiera o necesite.\n\nAhora tengo que hacer nuestra llamada de cumplimiento. Esto significa que tengo que hacerle algunas preguntas para asegurarme de que entiende completamente nuestro programa y está de acuerdo en trabajar con nosotros, pero si tiene alguna pregunta, puede preguntarme. Disculpe de antemano, puede tomar unos minutos terminar todas estas preguntas",
    options: [
      { text: "Continue", next: "correctPackageSelected" }
    ]
  },
  correctPackageSelected: {
    id: "correctPackageSelected",
    label: "Paquete Correcto Seleccionado y SMS Enviado",
    script: "¡Muchas gracias por eso! Ahora voy a enviarle un mensaje a su teléfono, tendrá nuestro contrato en él, y verá todos los detalles allí, y todos sus pagos. Solo tiene que hacer clic en el enlace cuando lo vea, y hacer clic en los botones para firmar. Si tiene alguna pregunta, hágamelo saber y puedo ayudar",
    options: [
      { text: "Continue", next: "contractSignedByClient" }
    ]
  },
  contractSignedByClient: {
    id: "contractSignedByClient",
    label: "Contrato Firmado por el Cliente",
    script: "Ok, acabo de recibir la nota de que firmó esto, ¡gracias!\n\nSi fuera usted, guardaría este número en su teléfono para que sepa cuándo llaman en caso de que se lo pierda, puede devolverles la llamada. El número de teléfono es 561-763-8380, y están abiertos de 6AM a 3PM hora del Pacífico",
    note: "If Elevate: Entonces lo que va a pasar ahora es que nuestro equipo de gestión le dará una llamada dentro de las 24 horas solo para presentarse y decir Hola, y puede hacerles cualquier pregunta que pueda tener. También le darán los detalles sobre cómo ver todos sus pagos en línea si quiere.",
    options: [
      { text: "Continue", next: "softCreditPull" }
    ]
  },
  softCreditPull: {
    id: "softCreditPull",
    label: "Soft Credit Pull",
    script: "We will now do a soft-credit pull as required by the program. This may or may not affect your credit score, but you can rest assured that going through the program will yield more benefits than any temporary impact. In fact, many of our clients see their credit improve over time as their debt decreases and accounts are settled.",
    options: [
      { text: "Continue", next: "checkDebt" }
    ]
  },
  consumerShieldFlow: {
    id: "consumerShieldFlow",
    label: "Programa de Protección al Consumidor",
    script: "Basado en su monto de deuda, podría calificar para el Programa de Protección al Consumidor. Este programa está diseñado para clientes con $5,550 o más en deudas adeudadas, un pago mínimo de $220/mes, y un término de plan de 24 meses (menos de $8,800) o 36 meses (más de $8,800). Todas las cuentas adeudadas deben tener un saldo de al menos $200. El pago inicial debe realizarse dentro de los 18 días de inscripción. ¿Le gustaría proceder con el proceso de calificación?",
    options: [
      { text: "Yes", next: "consumerShieldSoftCreditPull" },
      { text: "No", next: "start" }
    ]
  },
  consumerShieldSoftCreditPull: {
    id: "consumerShieldSoftCreditPull",
    label: "Pull de Crédito Suave para Protección al Consumidor",
    script: "Gracias por confirmar, ahora haremos un pull de crédito suave como se requiere por el Programa de Protección al Consumidor. Esto puede o no afectar su puntaje de crédito, pero puede estar tranquilo de que seguir este programa le dará más beneficios que cualquier impacto temporal. ¿Le gustaría continuar?",
    options: [
      { text: "Continue", next: "consumerShieldCheckState" }
    ]
  },
  consumerShieldCheckState: {
    id: "consumerShieldCheckState",
    label: "Revisión de Estado para Protección al Consumidor",
    script: "¿En qué estado reside? (El Programa de Protección al Consumidor no está disponible en CO, PA, NJ, OR)",
    options: [
      { text: "Continue", next: "consumerShieldQualified" }
    ]
  },
  consumerShieldQualified: {
    id: "consumerShieldQualified",
    label: "Calificado para Protección al Consumidor",
    script: "¡Buenas noticias! Según lo que ha compartido, califica para el Programa de Protección al Consumidor. Permítame explicarte cómo funciona...",
    options: [
      { text: "Start Over", next: "start" }
    ]
  },
  consumerShieldNotQualified: {
    id: "consumerShieldNotQualified",
    label: "No Calificado para Protección al Consumidor",
    script: "I apologize, but based on the information provided, you do not qualify for the Consumer Shield program. Here are some alternative resources that might help...",
    options: [
      { text: "Start Over", next: "start" }
    ]
  },
  selectedFlow: {
    id: "selectedFlow",
    label: "Flujo Seleccionado",
    script: (state) => {
      const vendor = stateVendorMap[state];
      if (vendor === 'Elevate_FSP') {
        return "¡Buenas noticias! Según su estado, trabajará con Elevate Finance, LLC. Ofrecen un programa integral de alivio de deudas con una estructura de tarifas del 27%.";
      } else if (vendor === 'Clarity') {
        return `¡Excelente! Según su estado, trabajará con ${stateAttorneyMap[state]}. Este es un programa Clarity respaldado por abogados con una estructura de tarifas del 27%${state === 'CO' ? ' (Nota: El plan Fresh Start no está disponible en Colorado)' : ''}.`;
      }
      return "Continuando con su programa seleccionado...";
    },
    options: [
      { text: "Continue", next: "checkingAccount" }
    ]
  },
  checkingAccount: {
    id: "checkingAccount",
    label: "Cuenta Corriente",
    script: "¿Tiene una cuenta corriente a su nombre?",
    options: [
      { text: "Yes", next: "qualified" },
      { text: "No", next: "notQualified" }
    ]
  },
  qualified: {
    id: "qualified",
    label: "Calificado",
    script: "¡Excelentes noticias! Según lo que ha compartido, califica para nuestro programa de alivio de deudas. Permítame explicarle cómo funciona...",
    options: [
      { text: "Comenzar de Nuevo", next: "start" }
    ]
  },
  notQualified: {
    id: "notQualified",
    label: "No Califica",
    script: "Lo siento, pero según la información proporcionada, no podemos ayudar con su situación actual. Aquí hay algunos recursos alternativos que podrían ayudar...",
    options: [
      { text: "Comenzar de Nuevo", next: "start" }
    ]
  },
  disqualifier: {
    id: "disqualifier",
    label: "Descalificado - Tipo de Deuda No Soportado",
    script: "Entiendo que tiene deuda relacionada con [Tipo de Deuda]. Desafortunadamente, no podemos ayudar con este tipo de deuda debido a restricciones legales y del programa. Sin embargo, puedo proporcionarle algunos recursos alternativos que podrían ser útiles para su situación.",
    options: [
      { text: "Comenzar de Nuevo", next: "start" },
      { text: "Verificar Otra Deuda", next: "checkDebt" }
    ]
  },
  loanReferral: {
    id: "loanReferral",
    label: "Referencia de Préstamo",
    script: "I understand you're looking for a loan. While we don't provide loans directly, we can help you understand your options and potentially improve your chances of approval through debt relief. Would you like to hear more about how our program could help?",
    options: [
      { text: "Yes", next: "qualify" },
      { text: "No", next: "start" }
    ]
  },
  debtConsolidation: {
    id: "debtConsolidation",
    label: "Consolidación de Deuda",
    script: "Nuestro programa de alivio de deudas suele ser más efectivo que la consolidación tradicional. En lugar de asumir nuevas deudas, negociamos con sus acreedores para reducir lo que debe. ¿Le gustaría saber más sobre cómo funciona esto?",
    options: [
      { text: "Sí", next: "qualify" },
      { text: "No", next: "start" }
    ]
  },
  creditRepair: {
    id: "creditRepair",
    label: "Reparación de Crédito",
    script: "Si bien no ofrecemos servicios directos de reparación de crédito, nuestro programa de alivio de deudas naturalmente ayuda a mejorar su puntaje crediticio al reducir su carga de deudas y establecer un historial de pagos positivo. ¿Le gustaría saber más?",
    options: [
      { text: "Sí", next: "qualify" },
      { text: "No", next: "start" }
    ]
  },
  bankruptcy: {
    id: "bankruptcy",
    label: "Bancarrota",
    script: "Antes de considerar la bancarrota, exploremos si nuestro programa de alivio de deudas podría ayudar. Podemos reducir su deuda significativamente sin las consecuencias a largo plazo de la bancarrota. ¿Le gustaría saber más?",
    options: [
      { text: "Sí", next: "qualify" },
      { text: "No", next: "start" }
    ]
  },
  elevateFSPFlow: {
    id: "elevateFSPFlow",
    label: "Programa Elevate Finance",
    script: "¡Buenas noticias! Según su estado, trabajará con Elevate Finance, LLC. Ofrecen un programa integral de alivio de deudas con una estructura de tarifas del 27%. ¿Le gustaría continuar con el proceso de calificación?",
    options: [
      { text: "Yes", next: "softCreditPull" },
      { text: "No", next: "start" }
    ]
  },
  clarityFlow: {
    id: "clarityFlow",
    label: "Programa Clarity Respaldado por Abogados",
    script: (state) => `¡Excelente! Según su estado, trabajará con ${stateAttorneyMap[state]}. Este es un programa Clarity respaldado por abogados con una estructura de tarifas del 27%${state === 'CO' ? ' (Nota: El plan Fresh Start no está disponible en Colorado)' : ''}. ¿Le gustaría continuar con el proceso de calificación?`,
    options: [
      { text: "Yes", next: "softCreditPull" },
      { text: "No", next: "start" }
    ]
  }
};

// Add list of all debt types
const debtTypes = [
  "Credit Card Debt",
  "Personal Loans",
  "Medical Bills",
  "Collection Accounts",
  "Secured loans",
  "Employee Credit Union Debt",
  "Federally Backed Student Loans",
  "Military Cards/Accounts",
  "IRS Income Taxes",
  "Auto and Motorcycle Loans",
  "Mortgage Loans",
  "Credit Union Personal Loans",
  "Home Equity Loans",
  "Court/Legal Debts",
  "Accounts with Judgement",
  "Alimony and Child Support",
  "Attorney's Fees",
  "Gambling Debts",
  "Time Share Debt",
  "Property Tax",
  "Bail Bond Debt",
  "Private Student Loans",
  "Store Credit Cards",
  "Payday Loans",
  "Business Credit Cards",
  "Utility Bills",
  "Cell Phone Bills"
];

// Add list of unacceptable debt types for validation
const unacceptableDebtTypes = [
  "Secured loans",
  "Employee Credit Union Debt",
  "Federally Backed Student Loans",
  "Military Cards/Accounts",
  "IRS Income Taxes",
  "Auto and Motorcycle Loans",
  "Mortgage Loans",
  "Credit Union Personal Loans",
  "Home Equity Loans",
  "Court/Legal Debts",
  "Accounts with Judgement",
  "Alimony and Child Support",
  "Attorney's Fees",
  "Gambling Debts",
  "Time Share Debt",
  "Property Tax",
  "Bail Bond Debt"
];

// Add Spanish translations for debt types
const translatedDebtTypes = {
  "Credit Card Debt": "Deuda de Tarjeta de Crédito",
  "Personal Loans": "Préstamos Personales",
  "Medical Bills": "Facturas Médicas",
  "Collection Accounts": "Cuentas en Colección",
  "Secured loans": "Préstamos Garantizados",
  "Employee Credit Union Debt": "Deuda de Cooperativa de Crédito de Empleados",
  "Federally Backed Student Loans": "Préstamos Estudiantiles Federales",
  "Military Cards/Accounts": "Tarjetas/Cuentas Militares",
  "IRS Income Taxes": "Impuestos sobre la Renta del IRS",
  "Auto and Motorcycle Loans": "Préstamos de Auto y Motocicleta",
  "Mortgage Loans": "Préstamos Hipotecarios",
  "Credit Union Personal Loans": "Préstamos Personales de Cooperativa de Crédito",
  "Home Equity Loans": "Préstamos sobre el Valor de la Vivienda",
  "Court/Legal Debts": "Deudas Legales/Judiciales",
  "Accounts with Judgement": "Cuentas con Sentencia Judicial",
  "Alimony and Child Support": "Pensión Alimenticia y Manutención Infantil",
  "Attorney's Fees": "Honorarios de Abogados",
  "Gambling Debts": "Deudas de Juego",
  "Time Share Debt": "Deuda de Tiempo Compartido",
  "Property Tax": "Impuesto a la Propiedad",
  "Bail Bond Debt": "Deuda de Fianza",
  "Private Student Loans": "Préstamos Estudiantiles Privados",
  "Store Credit Cards": "Tarjetas de Crédito de Tiendas",
  "Payday Loans": "Préstamos de Día de Pago",
  "Business Credit Cards": "Tarjetas de Crédito Comerciales",
  "Utility Bills": "Facturas de Servicios Públicos",
  "Cell Phone Bills": "Facturas de Teléfono Celular"
};

// Add state list (we'll update this based on the PDF)
const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

// Add Spanish translations for states
const translatedStates = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
  'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
  'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawái', 'ID': 'Idaho',
  'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
  'KY': 'Kentucky', 'LA': 'Luisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
  'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
  'NH': 'New Hampshire', 'NJ': 'Nueva Jersey', 'NM': 'Nuevo México', 'NY': 'Nueva York',
  'NC': 'Carolina del Norte', 'ND': 'Dakota del Norte', 'OH': 'Ohio', 'OK': 'Oklahoma',
  'OR': 'Oregón', 'PA': 'Pensilvania', 'RI': 'Rhode Island', 'SC': 'Carolina del Sur',
  'SD': 'Dakota del Sur', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
  'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'Virginia Occidental',
  'WI': 'Wisconsin', 'WY': 'Wyoming'
};

// State to vendor mapping based on the provided list
const stateVendorMap = {
  'AK': 'Elevate_FSP',
  'AL': 'Elevate_FSP',
  'AR': 'Elevate_FSP',
  'AZ': 'Elevate_FSP',
  'CA': 'Elevate_FSP',
  'CO': 'Clarity',
  'CT': 'Clarity',
  'DE': 'Clarity',
  'DC': 'Clarity',
  'FL': 'Elevate_FSP',
  'GA': 'Clarity',
  'HI': 'Clarity',
  'IA': 'Clarity',
  'ID': 'Clarity',
  'IL': 'Clarity',
  'IN': 'Elevate_FSP',
  'KS': 'Clarity',
  'KY': 'Clarity',
  'LA': 'Elevate_FSP',
  'MA': 'Clarity',
  'MD': 'Clarity',
  'ME': 'Clarity',
  'MI': 'Elevate_FSP',
  'MO': 'Elevate_FSP',
  'MS': 'Elevate_FSP',
  'MT': 'Clarity',
  'NE': 'Elevate_FSP',
  'NH': 'Clarity',
  'NJ': 'Clarity',
  'NM': 'Elevate_FSP',
  'NV': 'Clarity',
  'NY': 'Elevate_FSP',
  'NC': 'Elevate_FSP',
  'ND': 'Clarity',
  'OH': 'Clarity',
  'OK': 'Elevate_FSP',
  'PA': 'Clarity',
  'RI': 'Clarity',
  'SC': 'Clarity',
  'SD': 'Elevate_FSP',
  'TN': 'Clarity',
  'TX': 'Clarity',
  'UT': 'Clarity',
  'VA': 'Clarity',
  'VT': 'Clarity',
  'WV': 'Clarity',
  'WY': 'Clarity',
  'PR': 'Clarity'
};

// Add state to attorney/firm mapping
const stateAttorneyMap = {
  'CT': 'Ali Mian, Attorney At Law',
  'DE': 'Garibian Law Offices',
  'DC': 'Attorney M Edvard Shprukhman',
  'GA': 'Attorney M Edvard Shprukhman',
  'IA': 'Attorney Kent Cobb',
  'ID': 'Law Offices of Zachary Derr',
  'IL': 'Attorney Kent Cobb',
  'KS': 'Law Office of Phillips & Raney',
  'KY': 'Taylor Kain Law Office',
  'MA': 'McCarthy Law, LLC',
  'MD': 'Attorney M Edvard Shprukhman',
  'ME': 'Bopp & Guecia Attorneys at Law',
  'MT': 'Law Offices of Janice Lorrah',
  'NH': 'Ali Mian, Attorney At Law',
  'NJ': 'Attorney M Edvard Shprukhman',
  'NV': 'David Salmon & Associates',
  'ND': 'Attorney Kent Cobb',
  'OH': 'Law Offices of Barbara Tavaglione',
  'PA': 'Attorney M Edvard Shprukhman',
  'RI': 'McCarthy Law, LLC',
  'SC': 'Attorney Bethany Lockliear',
  'TN': 'Ginsburg Law Group',
  'TX': 'Ginsburg Law Group',
  'UT': 'Owings Law (Lisa Owings)',
  'VA': 'Law Offices of James W. Curd',
  'WV': 'M Edvard Shprukhman',
  'VT': 'Law Offices of William van Zyverde',
  'WY': 'Attorney Kent Cobb',
  'PR': 'Mayra Romero, Esq.'
};

// Add special notes for states
const stateNotes = {
  'CO': 'FRESH START PLAN (ADD ON) is not offered in Colorado. Clients will have the option to pay for discount legal defense but it\'s not included in the debt settlement service.',
  'NJ': 'No direct mail allowed in New Jersey',
  'OH': 'No direct mail allowed in Ohio'
};

// List of states we don't service
const unsupportedStates = ['MN', 'OR'];

// Add Consumer Shield unsupported states
const consumerShieldUnsupportedStates = ["CO", "PA", "NJ", "OR"];

// Add Spanish translations for UI elements
const uiTranslations = {
  en: {
    addDebt: "Add Debt",
    checkDebt: "Check Debt",
    continue: "Continue",
    back: "← Back",
    home: "🏠 Home",
    copy: "Copy",
    clear: "Clear",
    saveNotes: "Save Notes",
    clean: "Clear",
    debtBreakdown: "Debt Breakdown",
    debtType: "Debt Type",
    amount: "Amount",
    selectOption: "-- Select an option --",
    selectState: "-- Select a state --",
    totalDebt: "Total Debt:",
    selectYourState: "Select your State",
    callLog: "Call Log",
    noLogEntries: "No log entries",
    agentNotes: "Agent Notes",
    enterNotesHere: "Enter notes here...",
    agentChecklist: "Agent Checklist",
    completion: "Completion:",
    ineligibleDebtType: "Ineligible Debt Type",
    checkOtherDebt: "Check Other Debt",
    startOver: "Start Over",
    selectedObjection: "Selected Objection",
    close: "Close",
    incompleteChecklist: "Incomplete Checklist",
    exitAnyway: "Exit Anyway",
    continueWorking: "Continue Working",
    loanReferral: "Loan Referral",
    debtConsolidation: "Debt Consolidation",
    creditRepair: "Credit Repair",
    thisDebtTypeNotEligible: "This debt type is not eligible",
    selectFlow: "Select a Flow",
    cancel: "Cancel",
    qualificationCriteria: "Qualification Criteria",
    debtRequirements: "Debt Requirements",
    monthlyPaymentMinimums: "Monthly Payment Minimums by Debt Load",
    programDurationLimits: "Program Duration Limits",
    clientPaymentRequirements: "Client Payment Requirements",
    documentationRequirements: "Documentation Requirements",
    specificAcceptableCreditors: "Specific Acceptable Creditors",
    disqualifiersUnacceptableDebt: "❌ Disqualifiers / Unacceptable Debt",
    warning: "Warning",
    success: "Success",
    debtTotalCheckCleared: "Debt Total Check Cleared",
    proceed: "Proceed",
    debtNotQualified: "Debt Not Qualified",
    debtBelowMinimum: "The following debt type has an amount below $250:",
    medicalStudentLoanWarning: "Medical Bills / Student Loans should not exceed 50% of the total debt",
    sendToClarity: "Send to Clarity",
    addressChecklist: "Address Checklist",
    addressInformation: "Address Information",
    qualificationChecklist: "Qualification Checklist",
    inputContactNameStateLanguage: "Input Contact Name, State and Language",
    employmentChecklist: "Employment Checklist",
    employmentInformation: "Employment Information",
    ssnChecklist: "SSN Checklist",
    socialSecurityNumber: "Social Security Number",
    hardshipChecklist: "Hardship Checklist",
    hardshipInformation: "Hardship Information",
    accountChecklist: "Account Checklist",
    onlyEnrolledDebtsSelected: "Only Enrolled debts are selected",
    backEndChecklist: "Back-end Checklist",
    backEndChosen: "Back-end Chosen",
    budgetChecklist: "Budget Checklist",
    budgetAnalysis: "Budget Analysis",
    bankingChecklist: "Banking Checklist",
    bankingInformation: "Banking Information",
    scheduledPaymentChecklist: "Scheduled Payment Checklist",
    scheduledFirstPayment: "Scheduled First Payment",
    complianceChecklist: "Compliance Checklist",
    complianceQuestionsAsked: "Compliance questions asked and recorded",
    packageChecklist: "Package Checklist",
    correctPackageSelected: "Correct Package was selected, and SMS sent",
    contractChecklist: "Contract Checklist",
    contractSignedByClient: "Contract signed by client"
  },
  es: {
    addDebt: "Agregar Deuda",
    checkDebt: "Verificar Deuda",
    continue: "Continuar",
    back: "← Atrás",
    home: "🏠 Inicio",
    copy: "Copiar",
    clear: "Borrar",
    saveNotes: "Guardar Notas",
    clean: "Limpiar",
    debtBreakdown: "Desglose de la Deuda",
    debtType: "Tipo de Deuda",
    amount: "Cantidad",
    selectOption: "-- Seleccione una opción --",
    selectState: "-- Seleccione un estado --",
    totalDebt: "Total de Deuda:",
    selectYourState: "Seleccione su Estado",
    callLog: "Registro de Llamada",
    noLogEntries: "No hay entradas en el registro",
    agentNotes: "Notas del Agente",
    enterNotesHere: "Escriba notas aquí...",
    agentChecklist: "Lista de Verificación del Agente",
    completion: "Completado:",
    ineligibleDebtType: "Tipo de Deuda No Elegible",
    checkOtherDebt: "Verificar Otra Deuda",
    startOver: "Comenzar de Nuevo",
    selectedObjection: "Objeción Seleccionada",
    close: "Cerrar",
    incompleteChecklist: "Lista de Verificación Incompleta",
    exitAnyway: "Salir de Todos Modos",
    continueWorking: "Continuar Trabajando",
    loanReferral: "Referencia de Préstamo",
    debtConsolidation: "Consolidación de Deuda",
    creditRepair: "Reparación de Crédito",
    thisDebtTypeNotEligible: "Este tipo de deuda no es elegible",
    selectFlow: "Seleccionar Flujo",
    cancel: "Cancelar",
    qualificationCriteria: "Criterios de Calificación",
    debtRequirements: "Requisitos de Deuda",
    monthlyPaymentMinimums: "Pagos Mensuales Mínimos por Carga de Deuda",
    programDurationLimits: "Límites de Duración del Programa",
    clientPaymentRequirements: "Requisitos de Pago del Cliente",
    documentationRequirements: "Requisitos de Documentación",
    specificAcceptableCreditors: "Acreedores Aceptables Específicos",
    disqualifiersUnacceptableDebt: "❌ Descalificadores / Deuda Inaceptable",
    warning: "Advertencia",
    success: "Éxito",
    debtTotalCheckCleared: "Verificación de Deuda Total Aprobada",
    proceed: "Proceder",
    debtNotQualified: "Deuda No Calificada",
    debtBelowMinimum: "El siguiente tipo de deuda tiene un monto inferior a $250:",
    medicalStudentLoanWarning: "Las Facturas Médicas / Préstamos Estudiantiles no deben exceder el 50% de la deuda total",
    sendToClarity: "Enviar a Clarity",
    addressChecklist: "Lista de Verificación de Domicilio",
    addressInformation: "Información de Domicilio",
    qualificationChecklist: "Lista de Verificación de Calificación",
    inputContactNameStateLanguage: "Ingresar Nombre, Estado y Lenguaje",
    employmentChecklist: "Lista de Verificación de Empleo",
    employmentInformation: "Información de Empleo",
    ssnChecklist: "Lista de Verificación de SSN",
    socialSecurityNumber: "Número de Seguro Social",
    hardshipChecklist: "Lista de Verificación de Dificultad",
    hardshipInformation: "Información de Dificultad",
    accountChecklist: "Lista de Verificación de Cuenta",
    onlyEnrolledDebtsSelected: "Solo se seleccionaron deudas adeudadas",
    backEndChecklist: "Lista de Verificación Final",
    backEndChosen: "Final Seleccionado",
    budgetChecklist: "Lista de Verificación de Presupuesto",
    budgetAnalysis: "Análisis de Presupuesto",
    bankingChecklist: "Lista de Verificación Bancaria",
    bankingInformation: "Información Bancaria",
    scheduledPaymentChecklist: "Lista de Verificación de Pago Programado",
    scheduledFirstPayment: "Pago Programado Inicial y Frecuencia",
    complianceChecklist: "Lista de Verificación de Cumplimiento",
    complianceQuestionsAsked: "Preguntas de Cumplimiento y Registro",
    packageChecklist: "Lista de Verificación de Paquete",
    correctPackageSelected: "Paquete Correcto Seleccionado, y SMS enviado",
    contractChecklist: "Lista de Verificación de Contrato",
    contractSignedByClient: "Contrato firmado por el cliente"
  }
};

function App() {
  const [language, setLanguage] = useState("en");
  const [step, setStep] = useState(flow.start);
  const [notes, setNotes] = useState("");
  const [showObjections, setShowObjections] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedObjection, setSelectedObjection] = useState(null);
  const [callLog, setCallLog] = useState([]);
  const [selectedDebtType, setSelectedDebtType] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [showDisqualificationModal, setShowDisqualificationModal] = useState(false);
  const [showChecklistWarning, setShowChecklistWarning] = useState(false);
  const [showDebtWarningModal, setShowDebtWarningModal] = useState(false);
  const [showDebtSuccessModal, setShowDebtSuccessModal] = useState(false);
  const [showDebtAmountWarningModal, setShowDebtAmountWarningModal] = useState(false);
  const [lowDebtType, setLowDebtType] = useState("");
  const [checklist, setChecklist] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false
  });
  
  // Add state for debt entries
  const [debtEntries, setDebtEntries] = useState([
    { type: "", amount: 0 },
    { type: "", amount: 0 },
    { type: "", amount: 0 },
    { type: "", amount: 0 },
    { type: "", amount: 0 }
  ]);

  // Calculate total debt
  const totalDebt = debtEntries.reduce((sum, entry) => sum + (parseFloat(entry.amount) || 0), 0);

  // Calculate checklist completion percentage
  const checklistCompletion = Math.round(
    (Object.values(checklist).filter(Boolean).length / Object.keys(checklist).length) * 100
  );

  // Add function to check single debt amount
  const checkSingleDebtAmount = (amount, type) => {
    const parsedAmount = parseFloat(amount) || 0;
    if (parsedAmount > 0 && parsedAmount < 250) {
      setLowDebtType(type);
      setShowDebtAmountWarningModal(true);
      setShowDebtWarningModal(false);
      setShowDebtSuccessModal(false);
    }
  };

  // Update handleDebtAmountChange to include the check
  const handleDebtAmountChange = (index, value) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setDebtEntries(prev => {
      const newEntries = [...prev];
      newEntries[index] = { ...newEntries[index], amount: cleanValue };
      return newEntries;
    });
  };

  // Handle debt type changes
  const handleDebtTypeChange = (index, value) => {
    if (unacceptableDebtTypes.includes(value)) {
      setSelectedDebtType(value);
      setShowDisqualificationModal(true);
      return;
    }
    
    setDebtEntries(prev => {
      const newEntries = [...prev];
      newEntries[index] = { ...newEntries[index], type: value };
      return newEntries;
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Define derived state first
  const currentObjectionMap = language === "es" ? translatedObjectionMap : objectionMap;
  const currentObjectionList = Object.keys(currentObjectionMap);
  const filteredObjections = currentObjectionList.filter(obj =>
    obj.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentFlow = language === "es" ? translatedFlow : flow;
  const currentStep = currentFlow[step.id] || {
    id: "fallback",
    label: language === "es" ? "Paso desconocido" : "Unknown Step",
    script: language === "es"
      ? "Este paso no está disponible actualmente en el flujo. Por favor, regrese al inicio."
      : "This step is not currently available in the flow. Please return to the start.",
    options: [
      { text: language === "es" ? "Inicio" : "Home", next: "start" }
    ]
  };

  // Define callbacks after derived state
  const addToLog = useCallback((action) => {
    const timestamp = new Date().toLocaleTimeString();
    setCallLog(prev => [...prev, `[${timestamp}] ${action}`]);
  }, []);

  const handleCopyLog = useCallback(() => {
    const logText = callLog.join('\n');
    navigator.clipboard.writeText(logText);
  }, [callLog]);

  const handleClearLog = useCallback(() => {
    setCallLog([]);
  }, []);

  const handleStepChange = useCallback((option) => {
    if (currentStep.id === "checkDebt") {
      if (option.text === "≥ $10,000") {
        setStep(currentFlow.debtConfirmation);
      } else {
        setStep(currentFlow.consumerShieldFlow);
      }
    } else if (currentStep.id === "backEndSelection") {
      // Add logging for back-end selection
      const backEndNote = `Back-end selected: ${option.text}`;
      setNotes(prev => prev ? `${prev}\n${backEndNote}` : backEndNote);
      addToLog(backEndNote);
      
      setStep(prev => {
        const nextStep = currentFlow[option.next];
        addToLog(`Moved from "${prev.label}" to "${nextStep.label}"`);
        return nextStep;
      });
    } else {
      setStep(prev => {
        const nextStep = currentFlow[option.next];
        addToLog(`Moved from "${prev.label}" to "${nextStep.label}"`);
        return nextStep;
      });
    }
  }, [currentStep, currentFlow, addToLog, setNotes]);

  const handleStateSelection = useCallback((state) => {
    setSelectedState(state);
    addToLog(`Selected state: ${state}`);
    
    if (unsupportedStates.includes(state)) {
      addToLog(`State "${state}" is not currently serviced`);
    }

    if (stateNotes[state]) {
      addToLog(`Note for ${state}: ${stateNotes[state]}`);
    }
  }, [addToLog]);

  // Add state for flow selection modal
  const [showFlowSelectModal, setShowFlowSelectModal] = useState(false);
  const [availableFlows, setAvailableFlows] = useState([]);

  const handleStateStepContinue = useCallback(() => {
    if (!selectedState) {
      return;
    }

    if (unsupportedStates.includes(selectedState)) {
      setStep(currentFlow.notQualified);
      return;
    }

    // New logic for flow availability
    let flows = [];
    if (selectedState === 'OR') {
      flows = ['Elevate']; // Only Elevate for Oregon
    } else if (selectedState === 'WA' || selectedState === 'WI') {
      flows = ['Clarity']; // Only Clarity for Washington and Wisconsin
    } else {
      flows = ['Elevate', 'Clarity']; // All other states get both
    }

    setAvailableFlows(flows);
    setShowFlowSelectModal(true);
  }, [selectedState, currentFlow]);

  // Handler for user selecting a flow from the modal
  const handleFlowSelect = (flowName) => {
    setShowFlowSelectModal(false);
    if (flowName === 'Elevate') {
      addToLog(`User selected Elevate flow for ${selectedState}`);
      setStep(currentFlow.employmentCheck);
    } else if (flowName === 'Clarity') {
      addToLog(`User selected Clarity flow for ${selectedState}`);
      setStep(currentFlow.employmentCheck);
    }
  };

  const handleObjectionSelect = useCallback((objection) => {
    setSearchTerm(objection);
    setSelectedObjection(objection);
    setShowObjections(true);
    addToLog(`Selected objection: "${objection}"`);
  }, [addToLog]);

  // Handle checklist item toggle
  const handleChecklistToggle = (itemNumber) => {
    setChecklist(prev => ({
      ...prev,
      [itemNumber]: !prev[itemNumber]
    }));
  };

  // Handle home button click with checklist warning
  const handleHomeClick = () => {
    if (checklistCompletion < 100) {
      setShowChecklistWarning(true);
    } else {
      setStep(flow.start);
      addToLog('Returned to start');
    }
  };

  // Add useEffect for debt type selector
  useEffect(() => {
    if (currentStep.id === "agreeQualify") {
      const selectorContainer = document.getElementById("debtTypeSelector");
      if (selectorContainer) {
        let select = selectorContainer.querySelector('select');
        if (!select) {
          select = document.createElement("select");
          select.className = "w-full p-2 border rounded-md shadow-sm";
        }
        
        // Clear existing options
        select.innerHTML = "";
        
        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = language === "es" ? "-- Seleccione una opción --" : "-- Select an option --";
        select.appendChild(defaultOption);
        
        // Add debt type options
        debtTypes.forEach(debtType => {
          const option = document.createElement("option");
          option.value = debtType;
          option.textContent = language === "es" ? translatedDebtTypes[debtType] : debtType;
          select.appendChild(option);
        });
        
        // Add change handler
        select.addEventListener('change', (e) => {
          const newDebtType = e.target.value;
          setSelectedDebtType(newDebtType);
          if (newDebtType && unacceptableDebtTypes.includes(newDebtType)) {
            setShowDisqualificationModal(true);
          }
        });
        
        // Clear and append new select
        selectorContainer.innerHTML = "";
        selectorContainer.appendChild(select);
        
        // Always update the selected value
        select.value = selectedDebtType;
      }
    }
  }, [currentStep.id, language, selectedDebtType]);

  // Add useEffect to handle state selector rendering
  useEffect(() => {
    if (currentStep.id === "agreeQualify") {
      const stateSelectorContainer = document.getElementById("stateSelector");
      if (stateSelectorContainer) {
        let select = stateSelectorContainer.querySelector('select');
        if (!select) {
          select = document.createElement("select");
          select.className = "w-full p-2 border rounded-md shadow-sm";
        }
        
        // Clear existing options
        select.innerHTML = "";
        
        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = language === "es" ? "-- Seleccione un estado --" : "-- Select a state --";
        select.appendChild(defaultOption);
        
        // Add state options
        states.forEach(state => {
          const option = document.createElement("option");
          option.value = state;
          option.textContent = language === "es" ? translatedStates[state] : state;
          select.appendChild(option);
        });
        
        // Add change handler
        select.addEventListener('change', (e) => {
          handleStateSelection(e.target.value);
        });
        
        // Clear and append new select
        stateSelectorContainer.innerHTML = "";
        stateSelectorContainer.appendChild(select);
        
        // Always update the selected value
        select.value = selectedState;
      }
    }
  }, [currentStep.id, language, selectedState, handleStateSelection]);

  // Add state for qualification modal and checklist
  const [showQualificationModal, setShowQualificationModal] = useState(false);
  const [qualificationChecklist, setQualificationChecklist] = useState({
    minTotalDebt: false,
    minPerCreditor: false,
    acceptableDebtTypes: false,
    monthlyPayment: false,
    programDuration: false,
    autoDraft: false,
    firstPayment: false,
    paymentToEachCreditor: false,
    documentation: false,
    accountNumbers: false,
    complianceCall: false,
    acceptableCreditors: false,
    noUnacceptableDebt: false,
    noUnacceptableCreditors: false,
    noOtherDisqualifiers: false
  });

  // Handler for checklist toggle
  const handleQualificationToggle = (key) => {
    setQualificationChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Handler for continue from soft credit pull
  const handleSoftCreditPullContinue = () => {
    setShowQualificationModal(true);
  };

  // Handler for continue from qualification modal
  const handleQualificationContinue = () => {
    setShowQualificationModal(false);
    setStep(flow.checkDebt); // or next appropriate step
  };

  // Update function to check debt percentages and amounts
  const checkDebtPercentages = () => {
    // Check for debts below $250
    const lowDebtEntry = debtEntries.find(entry => 
      entry.type && parseFloat(entry.amount) > 0 && parseFloat(entry.amount) < 250
    );

    if (lowDebtEntry) {
      setLowDebtType(lowDebtEntry.type);
      setShowDebtAmountWarningModal(true);
      setShowDebtWarningModal(false);
      setShowDebtSuccessModal(false);
      return;
    }

    const medicalAndStudentDebt = debtEntries.reduce((sum, entry) => {
      if (entry.type === "Medical Bills" || entry.type === "Private Student Loans") {
        return sum + (parseFloat(entry.amount) || 0);
      }
      return sum;
    }, 0);

    const percentage = (medicalAndStudentDebt / totalDebt) * 100;
    if (percentage > 50) {
      setShowDebtWarningModal(true);
      setShowDebtSuccessModal(false);
      setShowDebtAmountWarningModal(false);
    } else {
      setShowDebtSuccessModal(true);
      setShowDebtWarningModal(false);
      setShowDebtAmountWarningModal(false);
    }
  };

  // Add function to handle adding new debt entry
  const handleAddDebtEntry = () => {
    setDebtEntries(prev => [...prev, { type: "", amount: 0 }]);
  };

  // Add function to handle removing debt entry
  const handleRemoveDebtEntry = (index) => {
    setDebtEntries(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-row relative">
      {/* Left Panel - Objections */}
      <div className="w-64 bg-gray-100 p-4 overflow-y-auto border-r">
        <h2 className="font-bold mb-2">
          {language === "es" ? "Palabras Clave de Objeciones" : "Objection Keywords"}
        </h2>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === "es" ? "Buscar objeciones..." : "Search objections..."}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <ul className="space-y-2 text-sm">
          {filteredObjections.map((obj, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleObjectionSelect(obj)}
                className="text-left text-blue-600 hover:underline">
                {language === "es" ? translatedObjectionTitles[obj] || obj : obj}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 flex">
        {/* Center Column - Main Script */}
        <div className="flex-1 flex justify-center">
          <div className="w-[800px] flex items-center">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img 
                  src="/images/UCR.jpg"
                  alt="United Consumer Relief Logo"
                  className="h-48 object-contain"
                />
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">{currentStep.label}</h1>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Object.entries(languageOptions).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              
              <div 
                className="mb-4 whitespace-pre-line text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentStep.script }}
              />

              {currentStep.id === "addressConfirmation" && (
                <>
                  <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                    <p className="text-yellow-800 font-medium">
                      <strong>Note:</strong> If no email address, input "noemail@gmail.com"
                    </p>
                  </div>
                  
                  <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-3">
                      {uiTranslations[language].addressChecklist}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center bg-white p-2 rounded">
                        <input
                          type="checkbox"
                          checked={checklist["2"]}
                          onChange={() => handleChecklistToggle("2")}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                        <label className="ml-2 text-sm">
                          {uiTranslations[language].addressInformation}
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep.id === "accountConfirmation" && currentStep.note && (
                <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                  <p className="text-yellow-800 font-medium">
                    <strong>Note:</strong> {currentStep.note}
                  </p>
                </div>
              )}

              {currentStep.id === "scheduledFirstPayment" && currentStep.note && (
                <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                  <p className="text-yellow-800 font-medium">
                    <strong>Note:</strong> {currentStep.note}
                  </p>
                </div>
              )}

              {currentStep.id === "paymentSummary" && (
                <>
                  {currentStep.note1 && (
                    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                      <p className="text-yellow-800 font-medium">
                        <strong>Note 1:</strong> {currentStep.note1}
                      </p>
                    </div>
                  )}
                  {currentStep.note2 && (
                    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                      <p className="text-yellow-800 font-medium">
                        <strong>Note 2:</strong> {currentStep.note2}
                      </p>
                    </div>
                  )}
                </>
              )}

              {currentStep.id === "checkDebt" && (
                <div className="mb-6 space-y-4">
                  <div className="grid gap-4">
                    <div className="p-3 border rounded-lg bg-gray-50">
                      <h3 className="font-semibold mb-2">{uiTranslations[language].debtBreakdown}</h3>
                      
                      {debtEntries.map((entry, index) => (
                        <div key={index} className="mb-2 p-2 border rounded bg-white">
                          <div className="grid grid-cols-2 gap-2">
                            {/* Debt Type Selector */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {uiTranslations[language].debtType}
                              </label>
                              <select
                                value={entry.type}
                                onChange={(e) => handleDebtTypeChange(index, e.target.value)}
                                className="w-full p-2 border rounded-md shadow-sm"
                              >
                                <option value="">
                                  {uiTranslations[language].selectOption}
                                </option>
                                {debtTypes.map((debtType) => (
                                  <option key={debtType} value={debtType}>
                                    {language === "es" ? translatedDebtTypes[debtType] : debtType}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Amount Input */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {uiTranslations[language].amount}
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={entry.amount === 0 ? '' : entry.amount}
                                  onChange={(e) => handleDebtAmountChange(index, e.target.value)}
                                  onBlur={() => checkSingleDebtAmount(entry.amount, entry.type)}
                                  placeholder="$0.00"
                                  disabled={!entry.type || unacceptableDebtTypes.includes(entry.type)}
                                  className={`w-full p-2 border rounded ${
                                    !entry.type || unacceptableDebtTypes.includes(entry.type)
                                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                      : 'bg-white'
                                  }`}
                                />
                                {debtEntries.length > 1 && (
                                  <button
                                    onClick={() => handleRemoveDebtEntry(index)}
                                    className="p-2 text-red-600 hover:text-red-800"
                                    title="Remove debt entry"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                              {entry.type && unacceptableDebtTypes.includes(entry.type) && (
                                <p className="mt-1 text-xs text-red-600">
                                  {language === "es" 
                                    ? "Este tipo de deuda no es elegible" 
                                    : "This debt type is not eligible"}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add Debt Button */}
                      <button
                        onClick={handleAddDebtEntry}
                        className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {uiTranslations[language].addDebt}
                      </button>

                      {/* Total */}
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-semibold">
                          {uiTranslations[language].totalDebt}
                        </span>
                        <span className="text-xl font-bold text-blue-600">
                          {formatCurrency(totalDebt)}
                        </span>
                      </div>

                      {/* Check Debt Button */}
                      <button
                        onClick={checkDebtPercentages}
                        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        {uiTranslations[language].checkDebt}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "checkState" && (
                <div className="mb-6 space-y-4">
                  <div className="grid gap-4">
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-semibold mb-4">
                        {uiTranslations[language].selectYourState}
                      </h3>
                      <select
                        value={selectedState}
                        onChange={(e) => {
                          const state = e.target.value;
                          handleStateSelection(state);
                          if (state) {
                            const stateName = language === "es" ? translatedStates[state] : state;
                            const note = `State selected: ${stateName} (${state})`;
                            setNotes(prev => prev ? `${prev}\n${note}` : note);
                            addToLog(note);
                          }
                        }}
                        className="w-full p-2 border rounded-md shadow-sm mb-4"
                      >
                        <option value="">
                          {uiTranslations[language].selectState}
                        </option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {language === "es" ? translatedStates[state] : state}
                          </option>
                        ))}
                      </select>
                      {selectedState && stateNotes[selectedState] && (
                        <p className="mt-2 text-sm text-gray-600 italic">
                          Note: {stateNotes[selectedState]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "qualify" && (
                <>
                  <div className="mb-6 space-y-4">
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-lg bg-gray-50">
                        <h3 className="font-semibold mb-4">
                          {uiTranslations[language].selectYourState}
                        </h3>
                        <select
                          value={selectedState}
                          onChange={(e) => {
                            const state = e.target.value;
                            handleStateSelection(state);
                            if (state) {
                              const stateName = language === "es" ? translatedStates[state] : state;
                              const note = `State selected: ${stateName} (${state})`;
                              setNotes(prev => prev ? `${prev}\n${note}` : note);
                              addToLog(note);
                            }
                          }}
                          className="w-full p-2 border rounded-md shadow-sm mb-4"
                        >
                          <option value="">
                            {uiTranslations[language].selectState}
                          </option>
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {language === "es" ? translatedStates[state] : state}
                            </option>
                          ))}
                        </select>
                        {selectedState && stateNotes[selectedState] && (
                          <p className="mt-2 text-sm text-gray-600 italic">
                            Note: {stateNotes[selectedState]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-3">
                      {uiTranslations[language].qualificationChecklist}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center bg-white p-2 rounded">
                        <input
                          type="checkbox"
                          checked={checklist["1"]}
                          onChange={() => handleChecklistToggle("1")}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                        <label className="ml-2 text-sm">
                          {uiTranslations[language].inputContactNameStateLanguage}
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep.id === "employmentConfirmation" && (
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">
                    {uiTranslations[language].employmentChecklist}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checklist["3"]}
                        onChange={() => handleChecklistToggle("3")}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label className="ml-2 text-sm">
                        {uiTranslations[language].employmentInformation}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "ssnConfirmation" && (
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">
                    {uiTranslations[language].ssnChecklist}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checklist["4"]}
                        onChange={() => handleChecklistToggle("4")}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label className="ml-2 text-sm">
                        {uiTranslations[language].socialSecurityNumber}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "hardshipInformation" && (
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">
                    {uiTranslations[language].hardshipChecklist}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checklist["5"]}
                        onChange={() => handleChecklistToggle("5")}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label className="ml-2 text-sm">
                        {uiTranslations[language].hardshipInformation}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "accountConfirmation" && (
                <>
                  {currentStep.note && (
                    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                      <p className="text-yellow-800 font-medium">
                        <strong>Note:</strong> {currentStep.note}
                      </p>
                    </div>
                  )}
                  
                  <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-3">
                      {uiTranslations[language].accountChecklist}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center bg-white p-2 rounded">
                        <input
                          type="checkbox"
                          checked={checklist["6"]}
                          onChange={() => handleChecklistToggle("6")}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                        <label className="ml-2 text-sm">
                          {uiTranslations[language].onlyEnrolledDebtsSelected}
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep.id === "backEndSelection" && (
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">
                    {uiTranslations[language].backEndChecklist}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checklist["7"]}
                        onChange={() => handleChecklistToggle("7")}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label className="ml-2 text-sm">
                        {uiTranslations[language].backEndChosen}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "budgetAnalysis" && (
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">
                    {uiTranslations[language].budgetChecklist}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checklist["8"]}
                        onChange={() => handleChecklistToggle("8")}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label className="ml-2 text-sm">
                        {uiTranslations[language].budgetAnalysis}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "bankingInformation" && (
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">
                    {uiTranslations[language].bankingChecklist}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checklist["9"]}
                        onChange={() => handleChecklistToggle("9")}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label className="ml-2 text-sm">
                        {uiTranslations[language].bankingInformation}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "scheduledFirstPayment" && (
                <>
                  {currentStep.note && (
                    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                      <p className="text-yellow-800 font-medium">
                        <strong>Note:</strong> {currentStep.note}
                      </p>
                    </div>
                  )}
                  
                  <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-3">
                      {uiTranslations[language].scheduledPaymentChecklist}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center bg-white p-2 rounded">
                        <input
                          type="checkbox"
                          checked={checklist["10"]}
                          onChange={() => handleChecklistToggle("10")}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                        <label className="ml-2 text-sm">
                          {uiTranslations[language].scheduledFirstPayment}
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep.id === "complianceQuestions" && (
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">
                    {uiTranslations[language].complianceChecklist}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checklist["11"]}
                        onChange={() => handleChecklistToggle("11")}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label className="ml-2 text-sm">
                        {uiTranslations[language].complianceQuestionsAsked}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "correctPackageSelected" && (
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">
                    {uiTranslations[language].packageChecklist}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checklist["12"]}
                        onChange={() => handleChecklistToggle("12")}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label className="ml-2 text-sm">
                        {uiTranslations[language].correctPackageSelected}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "contractSignedByClient" && (
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">
                    {uiTranslations[language].contractChecklist}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checklist["13"]}
                        onChange={() => handleChecklistToggle("13")}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label className="ml-2 text-sm">
                        {uiTranslations[language].contractSignedByClient}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div className="grid gap-1 w-64 ml-0">
                  {currentStep.id === "softCreditPull" ? (
                    <button
                      className="bg-blue-600 text-white py-1 px-3 text-sm rounded hover:bg-blue-700 text-left"
                      onClick={handleSoftCreditPullContinue}
                    >
                      Continue
                    </button>
                  ) : (
                    currentStep.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleStepChange(option);
                        }}
                        disabled={
                          (currentStep.id === "qualify" && (option.text === "Continue" || option.text === "Continuar") && !checklist["1"]) ||
                          (currentStep.id === "checkDebt" && option.text === "≥ $10,000" && totalDebt < 10000) ||
                          (currentStep.id === "addressConfirmation" && (option.text === "Continue" || option.text === "Continuar") && !checklist["2"]) ||
                          (currentStep.id === "employmentConfirmation" && (option.text === "Continue" || option.text === "Continuar") && !checklist["3"]) ||
                          (currentStep.id === "ssnConfirmation" && (option.text === "Continue" || option.text === "Continuar") && !checklist["4"]) ||
                          (currentStep.id === "hardshipInformation" && (option.text === "Continue" || option.text === "Continuar") && !checklist["5"]) ||
                          (currentStep.id === "accountConfirmation" && (option.text === "Continue" || option.text === "Continuar") && !checklist["6"]) ||
                          (currentStep.id === "backEndSelection" && !checklist["7"]) ||
                          (currentStep.id === "budgetAnalysis" && (option.text === "Continue" || option.text === "Continuar") && !checklist["8"]) ||
                          (currentStep.id === "bankingInformation" && !checklist["9"]) ||
                          (currentStep.id === "scheduledFirstPayment" && (option.text === "Continue" || option.text === "Continuar") && !checklist["10"]) ||
                          (currentStep.id === "complianceQuestions" && (option.text === "Continue" || option.text === "Continuar") && !checklist["11"]) ||
                          (currentStep.id === "correctPackageSelected" && (option.text === "Continue" || option.text === "Continuar") && !checklist["12"]) ||
                          (currentStep.id === "contractSignedByClient" && (option.text === "Continue" || option.text === "Continuar") && !checklist["13"])
                        }
                        className={`bg-blue-600 text-white py-1 px-3 text-sm rounded hover:bg-blue-700 text-left ${
                          (currentStep.id === "qualify" && (option.text === "Continue" || option.text === "Continuar") && !checklist["1"]) ||
                          (currentStep.id === "checkDebt" && option.text === "≥ $10,000" && totalDebt < 10000) ||
                          (currentStep.id === "addressConfirmation" && (option.text === "Continue" || option.text === "Continuar") && !checklist["2"]) ||
                          (currentStep.id === "employmentConfirmation" && (option.text === "Continue" || option.text === "Continuar") && !checklist["3"]) ||
                          (currentStep.id === "ssnConfirmation" && (option.text === "Continue" || option.text === "Continuar") && !checklist["4"]) ||
                          (currentStep.id === "hardshipInformation" && (option.text === "Continue" || option.text === "Continuar") && !checklist["5"]) ||
                          (currentStep.id === "accountConfirmation" && (option.text === "Continue" || option.text === "Continuar") && !checklist["6"]) ||
                          (currentStep.id === "backEndSelection" && !checklist["7"]) ||
                          (currentStep.id === "budgetAnalysis" && (option.text === "Continue" || option.text === "Continuar") && !checklist["8"]) ||
                          (currentStep.id === "bankingInformation" && !checklist["9"]) ||
                          (currentStep.id === "scheduledFirstPayment" && (option.text === "Continue" || option.text === "Continuar") && !checklist["10"]) ||
                          (currentStep.id === "complianceQuestions" && (option.text === "Continue" || option.text === "Continuar") && !checklist["11"]) ||
                          (currentStep.id === "correctPackageSelected" && (option.text === "Continue" || option.text === "Continuar") && !checklist["12"]) ||
                          (currentStep.id === "contractSignedByClient" && (option.text === "Continue" || option.text === "Continuar") && !checklist["13"])
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {option.text}
                      </button>
                    ))
                  )}
                  {currentStep.id !== "start" && (
                    <>
                      <button
                        onClick={() => {
                          const prevStep = Object.values(currentFlow).find(step =>
                            step.options && step.options.some(opt => opt.next === currentStep.id)
                          );
                          if (prevStep) {
                            setStep(prevStep);
                            addToLog(`Moved back to "${prevStep.label}"`);
                          }
                        }}
                        className="bg-blue-600 text-white py-1 px-3 text-sm rounded hover:bg-blue-700 text-center"
                      >
                        {uiTranslations[language].back}
                      </button>
                      <button
                        onClick={handleHomeClick}
                        className="bg-red-600 text-white py-1 px-3 text-sm rounded hover:bg-red-700 text-center"
                      >
                        {uiTranslations[language].home}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Shortcuts and Logs */}
        <div className="w-96">
          {/* Shortcut Buttons */}
          <div className="bg-white shadow-lg rounded-2xl p-3 mb-2">
            <div className="grid gap-1">
              <button 
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 shadow text-sm" 
                onClick={() => setStep({ id: "loanReferral", label: uiTranslations[language].loanReferral, script: language === "es" ? "Script de Referencia de Préstamo" : "Loan Referral Script", options: [{ text: uiTranslations[language].back, next: "start" }] })}
              >
                {uiTranslations[language].loanReferral}
              </button>
              <button 
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 shadow text-sm" 
                onClick={() => setStep({ id: "debtConsolidation", label: uiTranslations[language].debtConsolidation, script: language === "es" ? "Script de Consolidación de Deuda" : "Debt Consolidation Script", options: [{ text: uiTranslations[language].back, next: "start" }] })}
              >
                {uiTranslations[language].debtConsolidation}
              </button>
            </div>
          </div>

          {/* Call Log Section */}
          <div className="bg-white shadow-lg rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">
                {uiTranslations[language].callLog}
              </h2>
              <div className="space-x-2">
                <button
                  onClick={handleCopyLog}
                  className="px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 copy-log-btn"
                >
                  {uiTranslations[language].copy}
                </button>
                <button
                  onClick={handleClearLog}
                  className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  {uiTranslations[language].clear}
                </button>
              </div>
            </div>
            <div className="h-48 overflow-y-auto border rounded p-2 text-sm font-mono bg-gray-50">
              {callLog.length === 0 ? (
                <p className="text-gray-500 italic">
                  {uiTranslations[language].noLogEntries}
                </p>
              ) : (
                callLog.map((entry, index) => (
                  <div key={index} className="py-1 border-b last:border-b-0">
                    {entry}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Agent Notes Section */}
          <div className="bg-white shadow-lg rounded-2xl p-4">
            <h2 className="font-semibold mb-2 text-lg">{uiTranslations[language].agentNotes}</h2>
            <textarea
              className="w-full h-32 p-2 border rounded-md mb-2"
              placeholder={uiTranslations[language].enterNotesHere}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              onClick={() => {
                setNotes(notes);
                setShowObjections(true);
              }}
              className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 text-sm mb-4"
            >
              {uiTranslations[language].saveNotes}
            </button>
            <button
              onClick={() => setNotes("")}
              className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 text-sm mb-4 ml-2"
            >
              {uiTranslations[language].clean}
            </button>

            {/* Call Completion Checklist */}
            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold mb-2">
                {uiTranslations[language].agentChecklist}
              </h3>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${checklistCompletion}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {uiTranslations[language].completion} {checklistCompletion}%
              </p>

              {/* Checklist Items */}
              <div className="space-y-2">
                {Object.keys(checklist).map((itemNumber) => (
                  <div key={itemNumber} className="flex items-center bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={checklist[itemNumber]}
                      onChange={() => handleChecklistToggle(itemNumber)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label className="ml-2 text-sm">
                      {itemNumber === "1" && "Input Contact Name, State and Language"}
                      {itemNumber === "2" && "Address Information"}
                      {itemNumber === "3" && "Employment Information"}
                      {itemNumber === "4" && "Social Security Number"}
                      {itemNumber === "5" && "Hardship Information"}
                      {itemNumber === "6" && "Only Enrolled debts are selected"}
                      {itemNumber === "7" && "Back-end Chosen"}
                      {itemNumber === "8" && "Budget Analysis"}
                      {itemNumber === "9" && "Banking Information"}
                      {itemNumber === "10" && "Scheduled First Payment"}
                      {itemNumber === "11" && "Compliance questions asked and recorded, uploaded to 'Docs' section"}
                      {itemNumber === "12" && "Correct Package was selected, and SMS sent"}
                      {itemNumber === "13" && "Contract signed by client"}
                      {itemNumber === "14" && "Download the signed contract from ClixSign Docs"}
                      {itemNumber === "15" && "Upload the signed contract for Payment Processing"}
                      {itemNumber === "16" && "File Submitted"}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDisqualificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              {language === "es" ? "Tipo de Deuda No Elegible" : "Ineligible Debt Type"}
            </h2>
            <p className="mb-4">
              {language === "es"
                ? `Lo sentimos, pero ${selectedDebtType} no es elegible para nuestro programa. ¿Le gustaría verificar otro tipo de deuda?`
                : `We're sorry, but ${selectedDebtType} is not eligible for our program. Would you like to check another debt type?`}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setShowDisqualificationModal(false);
                  setSelectedDebtType("");
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {language === "es" ? "Verificar Otra Deuda" : "Check Other Debt"}
              </button>
              <button
                onClick={() => {
                  setShowDisqualificationModal(false);
                  setSelectedDebtType("");
                  handleStepChange({ text: "Start Over", next: "start" });
                }}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {language === "es" ? "Comenzar de Nuevo" : "Start Over"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showObjections && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              {language === "es" ? "Objeción Seleccionada" : "Selected Objection"}
            </h2>
            <div className="mb-4">
              <h3 className="font-medium mb-2">{selectedObjection}</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-md">
                {currentObjectionMap[selectedObjection]}
              </p>
            </div>
            <button
              onClick={() => {
                setShowObjections(false);
                setSearchTerm("");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4 w-full"
            >
              {language === "es" ? "Cerrar" : "Close"}
            </button>
          </div>
        </div>
      )}

      {/* Checklist Warning Modal */}
      {showChecklistWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-yellow-600 mb-4">
              {language === "es" ? "Lista de Verificación Incompleta" : "Incomplete Checklist"}
            </h2>
            <p className="mb-4">
              {language === "es"
                ? `La lista de verificación está ${checklistCompletion}% completa. ¿Está seguro que desea salir?`
                : `The checklist is ${checklistCompletion}% complete. Are you sure you want to exit?`}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setShowChecklistWarning(false);
                  setStep(flow.start);
                  addToLog('Returned to start (checklist incomplete)');
                }}
                className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                {language === "es" ? "Salir de Todos Modos" : "Exit Anyway"}
              </button>
              <button
                onClick={() => setShowChecklistWarning(false)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {language === "es" ? "Continuar Trabajando" : "Continue Working"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showFlowSelectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Select a Flow</h2>
            <p className="mb-4">Which program would you like to proceed with for {selectedState}?</p>
            <div className="flex flex-col gap-3">
              <button
                className={`py-2 px-4 rounded font-semibold transition-colors duration-150
                  ${availableFlows.includes('Elevate') ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                onClick={() => availableFlows.includes('Elevate') && handleFlowSelect('Elevate')}
                disabled={!availableFlows.includes('Elevate')}
              >
                Elevate Finance Program
              </button>
              <button
                className={`py-2 px-4 rounded font-semibold transition-colors duration-150
                  ${availableFlows.includes('Clarity') ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                onClick={() => availableFlows.includes('Clarity') && handleFlowSelect('Clarity')}
                disabled={!availableFlows.includes('Clarity')}
              >
                Clarity Attorney-Backed Program
              </button>
            </div>
            <button
              className="mt-4 text-gray-500 hover:underline"
              onClick={() => setShowFlowSelectModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showQualificationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] max-h-[90vh] overflow-y-auto text-left">
            <h2 className="text-2xl font-bold mb-4 text-center">Qualification Criteria</h2>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Debt Requirements</h3>
              <ul className="mb-2 space-y-1">
                <li><input type="checkbox" checked={qualificationChecklist.minTotalDebt} onChange={() => handleQualificationToggle('minTotalDebt')} /> <span className="ml-2">Minimum total debt: $10,000 in acceptable debt</span></li>
                <li><input type="checkbox" checked={qualificationChecklist.minPerCreditor} onChange={() => handleQualificationToggle('minPerCreditor')} /> <span className="ml-2">Minimum per creditor: $500 (Elevate) / $250 (Clarity)</span></li>
                <li><input type="checkbox" checked={qualificationChecklist.acceptableDebtTypes} onChange={() => handleQualificationToggle('acceptableDebtTypes')} /> <span className="ml-2">Acceptable debt types: Major credit cards, department store cards, unsecured personal/bank loans, gas cards, jewelry cards, computers, cell phones (not current carrier), back rent (not current residence), medical debt (max 25% of total), private student loans (max 25%, must be out of school and show proof it's private), high-interest (payday/tribal) loans (max 25%, conditions apply), auto/motorcycle loan deficiencies (3rd-party collections only, documentation required), business debts (if business is closed, conditions apply), utilities (not current residence), cash advances (original documentation required)</span></li>
              </ul>
              <h3 className="font-semibold mb-2">Monthly Payment Minimums by Debt Load</h3>
              <ul className="mb-2 space-y-1">
                <li><input type="checkbox" checked={qualificationChecklist.monthlyPayment} onChange={() => handleQualificationToggle('monthlyPayment')} /> <span className="ml-2">$10k–$19,999: $310/mo | $20k–$29,999: $350/mo | $30k+: $450/mo</span></li>
              </ul>
              <h3 className="font-semibold mb-2">Program Duration Limits</h3>
              <ul className="mb-2 space-y-1">
                <li><input type="checkbox" checked={qualificationChecklist.programDuration} onChange={() => handleQualificationToggle('programDuration')} /> <span className="ml-2">Max 60 months (based on number of accounts and total debt)</span></li>
              </ul>
              <h3 className="font-semibold mb-2">Client Payment Requirements</h3>
              <ul className="mb-2 space-y-1">
                <li><input type="checkbox" checked={qualificationChecklist.autoDraft} onChange={() => handleQualificationToggle('autoDraft')} /> <span className="ml-2">Must be auto-drafted (no mail-in payments)</span></li>
                <li><input type="checkbox" checked={qualificationChecklist.firstPayment} onChange={() => handleQualificationToggle('firstPayment')} /> <span className="ml-2">First payment: 7–30 days after submission (10+ days for CA)</span></li>
                <li><input type="checkbox" checked={qualificationChecklist.paymentToEachCreditor} onChange={() => handleQualificationToggle('paymentToEachCreditor')} /> <span className="ml-2">At least 1 payment must have been made to each enrolled creditor</span></li>
              </ul>
              <h3 className="font-semibold mb-2">Documentation Requirements</h3>
              <ul className="mb-2 space-y-1">
                <li><input type="checkbox" checked={qualificationChecklist.documentation} onChange={() => handleQualificationToggle('documentation')} /> <span className="ml-2">SSN, signed agreement, hardship note, payment info, full budget in CRM</span></li>
                <li><input type="checkbox" checked={qualificationChecklist.accountNumbers} onChange={() => handleQualificationToggle('accountNumbers')} /> <span className="ml-2">Account numbers and balances for all enrolled debts</span></li>
                <li><input type="checkbox" checked={qualificationChecklist.complianceCall} onChange={() => handleQualificationToggle('complianceCall')} /> <span className="ml-2">Compliance call with a manager (not the rep)</span></li>
              </ul>
              <h3 className="font-semibold mb-2">Specific Acceptable Creditors</h3>
              <ul className="mb-2 space-y-1">
                <li><input type="checkbox" checked={qualificationChecklist.acceptableCreditors} onChange={() => handleQualificationToggle('acceptableCreditors')} /> <span className="ml-2">BOA, Chase, Wells Fargo, Capital One, etc. Navy FCU and USAA (with limitations), Discover and AmEx (each must be &lt;70% of total debt), Oportun credit cards (not in CA), Rise (not in CA)</span></li>
              </ul>
              <h3 className="font-semibold mb-2 text-red-600">❌ Disqualifiers / Unacceptable Debt</h3>
              <ul className="mb-2 space-y-1">
                <li><input type="checkbox" checked={qualificationChecklist.noUnacceptableDebt} onChange={() => handleQualificationToggle('noUnacceptableDebt')} /> <span className="ml-2">No secured loans, federally backed student loans, military accounts/cards, auto/motorcycle loans (unless deficiency with 3rd party), mortgage/home equity loans, property taxes, judgments, alimony, child support, gambling debts, timeshares, bail bonds, credit union loans/lines (only credit cards may be acceptable)</span></li>
                <li><input type="checkbox" checked={qualificationChecklist.noUnacceptableCreditors} onChange={() => handleQualificationToggle('noUnacceptableCreditors')} /> <span className="ml-2">No unacceptable creditors: SoFi (federally backed), Rocket Loans, Tower Loan, Aqua Finance, ISPC, Military Star, RC Willey, Aaron's, CNH Industrial, OMNI Financial, KOALAFI (leasing agreements), Altura Credit Union, Mariner, Republic, Security, World Finance, BHG, Duvera Finance, GRT American Financial</span></li>
                <li><input type="checkbox" checked={qualificationChecklist.noOtherDisqualifiers} onChange={() => handleQualificationToggle('noOtherDisqualifiers')} /> <span className="ml-2">No other disqualifiers: client must have made at least 1 payment, no secured liabilities or open asset accounts at same CU as enrolled credit card, files over $150,000 need pre-approval, military/clearance holders need supervisor consent, must provide validation documentation within 14 days</span></li>
              </ul>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className={`bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 font-semibold ${Object.values(qualificationChecklist).every(Boolean) ? '' : 'opacity-50 cursor-not-allowed'}`}
                onClick={handleQualificationContinue}
                disabled={!Object.values(qualificationChecklist).every(Boolean)}
              >
                Continue
              </button>
              <button
                className="ml-4 text-gray-500 hover:underline"
                onClick={() => setShowQualificationModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Debt Warning Modal */}
      {showDebtWarningModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto text-left">
            <h2 className="text-xl font-bold mb-4 text-red-600">Warning</h2>
            <p className="mb-4">Medical Bills / Student Loans should not exceed 50% of the total debt</p>
            <div className="bg-yellow-100 p-4 rounded-md mb-4">
              <p className="font-bold text-yellow-800">Send to Clarity</p>
            </div>
            <button
              onClick={() => setShowDebtWarningModal(false)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Debt Success Modal */}
      {showDebtSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto text-left">
            <h2 className="text-xl font-bold mb-4 text-green-600">Success</h2>
            <p className="mb-4">Debt Total Check Cleared</p>
            <button
              onClick={() => setShowDebtSuccessModal(false)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
      )}

      {/* Debt Amount Warning Modal */}
      {showDebtAmountWarningModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto text-left">
            <h2 className="text-xl font-bold mb-4 text-red-600">Warning</h2>
            <p className="mb-4">Debt Not Qualified</p>
            <p className="mb-4 text-gray-700">The following debt type has an amount below $250:</p>
            <div className="bg-red-100 p-4 rounded-md mb-4">
              <p className="font-bold text-red-800">{lowDebtType}</p>
            </div>
            <button
              onClick={() => setShowDebtAmountWarningModal(false)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
