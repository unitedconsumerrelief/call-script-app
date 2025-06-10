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
    script: "Good morning/afternoon, thank you for calling United Consumer Relief. This is [Agent Name]. How can I assist you today?",
    options: [{ text: "Continue", next: "qualify" }]
  },
  qualify: {
    id: "qualify",
    label: "Qualification",
    script: "You've come to the right place. Can I ask you a few quick questions to check if you qualify?",
    options: [
      { text: "Yes", next: "checkDebt" },
      { text: "No", next: "start" }
    ]
  },
  checkDebt: {
    id: "checkDebt",
    label: "Check Debt Amount",
    script: "What is your total unsecured debt amount? We typically work with clients who have $10,000 or more in debt.",
    options: [
      { text: "≥ $10,000", next: "checkState" },
      { text: "< $10,000", next: "notQualified" }
    ]
  },
  checkState: {
    id: "checkState",
    label: "Check State",
    script: "Which state do you reside in?",
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
      { text: "Yes", next: "checkDebt" },
      { text: "No", next: "start" }
    ]
  },
  clarityFlow: {
    id: "clarityFlow",
    label: "Clarity Attorney-Backed Program",
    script: (state) => `Excellent! Based on your state, you'll be working with ${stateAttorneyMap[state]}. This is a Clarity attorney-backed program with a 27% fee structure${state === 'CO' ? ' (Note: Fresh Start Plan add-on is not available in Colorado)' : ''}. Would you like to proceed with the qualification process?`,
    options: [
      { text: "Yes", next: "checkDebt" },
      { text: "No", next: "start" }
    ]
  }
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
      { text: "Sí", next: "checkDebt" },
      { text: "No", next: "start" }
    ]
  },
  checkDebt: {
    id: "checkDebt",
    label: "Verificar Monto de Deuda",
    script: "¿Cuál es el monto total de su deuda no garantizada? Típicamente trabajamos con clientes que tienen $10,000 o más en deudas.",
    options: [
      { text: "≥ $10,000", next: "checkState" },
      { text: "< $10,000", next: "notQualified" }
    ]
  },
  checkState: {
    id: "checkState",
    label: "Verificar Estado",
    script: "¿En qué estado reside?",
    options: [
      { text: "Continue", next: "checkingAccount" }
    ]
  },
  checkingAccount: {
    id: "checkingAccount",
    label: "Cuenta Corriente",
    script: "¿Tiene una cuenta corriente a su nombre?",
    options: [
      { text: "Sí", next: "qualified" },
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
    script: "Entiendo que está buscando un préstamo. Si bien no proporcionamos préstamos directamente, podemos ayudarle a comprender sus opciones y potencialmente mejorar sus posibilidades de aprobación a través del alivio de deudas. ¿Le gustaría saber más sobre cómo nuestro programa podría ayudar?",
    options: [
      { text: "Sí", next: "qualify" },
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
      { text: "Sí", next: "checkDebt" },
      { text: "No", next: "start" }
    ]
  },
  clarityFlow: {
    id: "clarityFlow",
    label: "Programa Clarity Respaldado por Abogados",
    script: (state) => `¡Excelente! Según su estado, trabajará con ${stateAttorneyMap[state]}. Este es un programa Clarity respaldado por abogados con una estructura de tarifas del 27%${state === 'CO' ? ' (Nota: El plan Fresh Start no está disponible en Colorado)' : ''}. ¿Le gustaría continuar con el proceso de calificación?`,
    options: [
      { text: "Sí", next: "checkDebt" },
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
const unsupportedStates = ['MN', 'OR', 'WA', 'WI'];

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
    setStep(prev => {
      const nextStep = currentFlow[option.next];
      addToLog(`Moved from "${prev.label}" to "${nextStep.label}"`);
      return nextStep;
    });
  }, [currentFlow, addToLog]);

  const checkDebtTypeQualification = useCallback((debtType) => {
    if (unacceptableDebtTypes.includes(debtType)) {
      setShowDisqualificationModal(true);
      return false;
    }
    return true;
  }, []);

  const handleStateSelection = useCallback((state) => {
    setSelectedState(state);
    addToLog(`Selected state: ${state}`);
    
    if (unsupportedStates.includes(state)) {
      addToLog(`State "${state}" is not currently serviced`);
      setStep(currentFlow.notQualified);
      return;
    }

    const vendor = stateVendorMap[state];
    
    if (stateNotes[state]) {
      addToLog(`Note for ${state}: ${stateNotes[state]}`);
    }

    if (vendor === 'Elevate_FSP') {
      addToLog(`Routing ${state} to Elevate Finance, LLC`);
      const nextStep = currentFlow.elevateFSPFlow;
      setStep(nextStep);
    } else if (vendor === 'Clarity') {
      addToLog(`Routing ${state} to Clarity - ${stateAttorneyMap[state]}`);
      const nextStep = {
        ...currentFlow.clarityFlow,
        script: currentFlow.clarityFlow.script(state)
      };
      setStep(nextStep);
    }
  }, [addToLog, currentFlow]);

  const handleObjectionSelect = useCallback((objection) => {
    setSearchTerm(objection);
    setSelectedObjection(objection);
    setShowObjections(true);
    addToLog(`Selected objection: "${objection}"`);
  }, [addToLog]);

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
          if (newDebtType) {
            checkDebtTypeQualification(newDebtType);
          }
        });
        
        // Clear and append new select
        selectorContainer.innerHTML = "";
        selectorContainer.appendChild(select);
        
        // Always update the selected value
        select.value = selectedDebtType;
      }
    }
  }, [currentStep.id, language, selectedDebtType, checkDebtTypeQualification]);

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
                className="mb-8 whitespace-pre-line text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentStep.script }}
              />

              {currentStep.id === "checkDebt" && (
                <div className="mb-4">
                  <div id="debtTypeSelector" className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "es" ? "Tipo de Deuda" : "Debt Type"}
                    </label>
                    <select
                      value={selectedDebtType}
                      onChange={(e) => {
                        setSelectedDebtType(e.target.value);
                        checkDebtTypeQualification(e.target.value);
                      }}
                      className="w-full p-2 border rounded-md shadow-sm"
                    >
                      <option value="">
                        {language === "es" ? "-- Seleccione una opción --" : "-- Select an option --"}
                      </option>
                      {debtTypes.map((debtType) => (
                        <option key={debtType} value={debtType}>
                          {language === "es" ? translatedDebtTypes[debtType] : debtType}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {currentStep.id === "checkState" && (
                <div className="mb-4">
                  <div id="stateSelector" className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "es" ? "Estado" : "State"}
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => handleStateSelection(e.target.value)}
                      className="w-full p-2 border rounded-md shadow-sm"
                    >
                      <option value="">
                        {language === "es" ? "-- Seleccione un estado --" : "-- Select a state --"}
                      </option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {language === "es" ? translatedStates[state] : state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div>
                <div className="grid gap-1 w-64">
                  {currentStep.id === "agreeQualify" ? (
                    <>
                      <div className="grid gap-1">
                        <button
                          onClick={() => handleStepChange({ text: "Qualified", next: "debtTypeProbe" })}
                          className="bg-blue-600 text-white py-1 px-3 text-sm rounded hover:bg-blue-700 text-left"
                        >
                          {language === "es" ? "Califica" : "Qualified"}
                        </button>
                        <button
                          onClick={() => handleStepChange({ text: "Not Qualified", next: "disqualifier" })}
                          className="bg-blue-600 text-white py-1 px-3 text-sm rounded hover:bg-blue-700 text-left"
                        >
                          {language === "es" ? "No Califica" : "Not Qualified"}
                        </button>
                        <button
                          onClick={() => setStep({ id: "unacceptableDebt", label: language === "es" ? "Categorías de Deuda No Aceptables" : "Unacceptable Debt Categories", script: currentFlow.unacceptableDebt.script, options: currentFlow.unacceptableDebt.options })}
                          className="bg-red-600 text-white py-1 px-3 text-sm rounded hover:bg-red-700 text-left"
                        >
                          {language === "es" ? "Deudas No Aceptables" : "Unacceptable Debt"}
                        </button>
                      </div>
                    </>
                  ) : (
                    currentStep.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleStepChange(option)}
                        className="bg-blue-600 text-white py-1 px-3 text-sm rounded hover:bg-blue-700 text-left"
                      >
                        {option.text}
                      </button>
                    ))
                  )}
                  
                  {/* Navigation Buttons */}
                  {currentStep.id !== "start" && (
                    <>
                      <div className="mt-2 border-t border-gray-200 pt-2 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            const prevStep = Object.values(currentFlow).find(step => 
                              step.options && step.options.some(opt => opt.next === currentStep.id)
                            );
                            if (prevStep) {
                              setStep(prevStep);
                              addToLog(`Moved back to "${prevStep.label}"`);
                            } else if (currentStep.id === "elevateFSPFlow" || currentStep.id === "clarityFlow") {
                              setStep(currentFlow.checkState);
                              addToLog(`Moved back to "${currentFlow.checkState.label}"`);
                            }
                          }}
                          className="bg-blue-600 text-white py-1 px-2 text-xs rounded hover:bg-blue-700 text-center"
                        >
                          {language === "es" ? "← Atrás" : "← Back"}
                        </button>
                        <button
                          onClick={() => {
                            setStep(flow.start);
                            addToLog('Returned to start');
                          }}
                          className="bg-red-600 text-white py-1 px-2 text-xs rounded hover:bg-red-700 text-center"
                        >
                          {language === "es" ? "🏠 Inicio" : "🏠 Home"}
                        </button>
                      </div>
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
          <div className="bg-white shadow-lg rounded-2xl p-4 mb-4">
            <div className="grid gap-2">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow text-sm" 
                onClick={() => setStep({ id: "loanReferral", label: language === "es" ? "Referencia de Préstamo" : "Loan Referral", script: language === "es" ? "Script de Referencia de Préstamo" : "Loan Referral Script", options: [{ text: language === "es" ? "Volver" : "Back", next: "start" }] })}
              >
                {language === "es" ? "Referencia de Préstamo" : "Loan Referral"}
              </button>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow text-sm" 
                onClick={() => setStep({ id: "debtConsolidation", label: language === "es" ? "Consolidación de Deuda" : "Debt Consolidation", script: language === "es" ? "Script de Consolidación de Deuda" : "Debt Consolidation Script", options: [{ text: language === "es" ? "Volver" : "Back", next: "start" }] })}
              >
                {language === "es" ? "Consolidación de Deuda" : "Debt Consolidation"}
              </button>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow text-sm" 
                onClick={() => setStep({ id: "creditRepair", label: language === "es" ? "Reparación de Crédito" : "Credit Repair", script: language === "es" ? "Script de Reparación de Crédito" : "Credit Repair Script", options: [{ text: language === "es" ? "Volver" : "Back", next: "start" }] })}
              >
                {language === "es" ? "Reparación de Crédito" : "Credit Repair"}
              </button>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow text-sm" 
                onClick={() => setStep({ id: "bankruptcy", label: language === "es" ? "Bancarrota" : "Bankruptcy", script: language === "es" ? "Script de Bancarrota" : "Bankruptcy Script", options: [{ text: language === "es" ? "Volver" : "Back", next: "start" }] })}
              >
                {language === "es" ? "Bancarrota" : "Bankruptcy"}
              </button>
            </div>
          </div>

          {/* Call Log Section */}
          <div className="bg-white shadow-lg rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">
                {language === "es" ? "Registro de Llamada" : "Call Log"}
              </h2>
              <div className="space-x-2">
                <button
                  onClick={handleCopyLog}
                  className="px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 copy-log-btn"
                >
                  {language === "es" ? "Copiar" : "Copy"}
                </button>
                <button
                  onClick={handleClearLog}
                  className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  {language === "es" ? "Borrar" : "Clear"}
                </button>
              </div>
            </div>
            <div className="h-48 overflow-y-auto border rounded p-2 text-sm font-mono bg-gray-50">
              {callLog.length === 0 ? (
                <p className="text-gray-500 italic">
                  {language === "es" ? "No hay entradas en el registro" : "No log entries"}
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
            <h2 className="font-semibold mb-2 text-lg">{language === "es" ? "Notas del Agente" : "Agent Notes"}</h2>
            <textarea
              className="w-full h-32 p-2 border rounded-md mb-2"
              placeholder={language === "es" ? "Escriba notas aquí..." : "Enter notes here..."}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              onClick={() => {
                setNotes(notes);
                setShowObjections(true);
              }}
              className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 text-sm"
            >
              {language === "es" ? "Guardar Notas" : "Save Notes"}
            </button>
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
                  handleStepChange({ text: "Check Other Debt", next: "checkDebt" });
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
              {language === "es" ? "Objeciones Seleccionadas" : "Selected Objections"}
            </h2>
            <p className="mb-4">
              {language === "es"
                ? "Por favor, seleccione una objeción para obtener más información."
                : "Please select an objection for more information."}
            </p>
            <div className="space-y-2">
              {filteredObjections.map((objection, idx) => (
                <button
                  key={idx}
                  onClick={() => handleObjectionSelect(objection)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full text-left"
                >
                  {objection}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowObjections(false)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4 w-full"
            >
              {language === "es" ? "Cerrar" : "Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
