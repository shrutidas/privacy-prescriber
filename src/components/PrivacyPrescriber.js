import React, { useState, useEffect } from 'react';
import { ArrowRight, Info, CheckCircle, ExternalLink } from 'lucide-react';

// Main Privacy Prescriber component
const PrivacyPrescriber = () => {
  // State to track current step
  const [currentStep, setCurrentStep] = useState(0);

  // State to store all user responses
  const [responses, setResponses] = useState({
    dataType: '',
    regulations: [],
    useCase: '',
    internalPriority: '',
    collaborationType: '',
    reidentifiable: '',
    processingType: ''
  });

  // State to manage conditional steps visibility
  const [visibleSteps, setVisibleSteps] = useState([0, 1, 2, 3, 8]);

  // Effect to update visible steps when responses change
  useEffect(() => {
    const newVisibleSteps = [0, 1, 2, 3];

    // Show internal priority step only if use case is 'internal'
    if (responses.useCase === 'internal') {
      newVisibleSteps.push(4);
    }

    // Show collaboration step only if use case is 'external'
    if (responses.useCase === 'external') {
      newVisibleSteps.push(5);
    }

    // Show reidentification step only if use case is 'public'
    if (responses.useCase === 'public') {
      newVisibleSteps.push(6);
    }

    // Show processing type step only if use case is 'ml'
    if (responses.useCase === 'ml') {
      newVisibleSteps.push(7);
    }

    // Always show summary as last step
    newVisibleSteps.push(8);

    setVisibleSteps(newVisibleSteps);
  }, [responses.useCase]);

  // Define all possible form steps
  const allSteps = [
    { title: "Welcome", component: <Welcome /> },
    { title: "Data Type", component: <DataTypeStep responses={responses} setResponses={setResponses} /> },
    { title: "Regulatory Requirements", component: <RegulationsStep responses={responses} setResponses={setResponses} /> },
    { title: "Use Case", component: <UseCaseStep responses={responses} setResponses={setResponses} /> },
    { title: "Internal Analytics Priority", component: <InternalPriorityStep responses={responses} setResponses={setResponses} /> },
    { title: "Collaboration Type", component: <CollaborationTypeStep responses={responses} setResponses={setResponses} /> },
    { title: "Public Data Release", component: <ReidentificationStep responses={responses} setResponses={setResponses} /> },
    { title: "AI/ML Model Training", component: <ProcessingTypeStep responses={responses} setResponses={setResponses} /> },
    { title: "Summary and Resources", component: <Summary responses={responses} /> }
  ];

  // Get only the visible steps
  const steps = visibleSteps.map(index => allSteps[index]);

  // Get the current step index in the visible steps array
  const currentVisibleStepIndex = visibleSteps.indexOf(currentStep);

  // Functions to navigate between steps
  const nextStep = () => {
    // Find the next step in the visible steps array
    if (currentVisibleStepIndex < steps.length - 1) {
      setCurrentStep(visibleSteps[currentVisibleStepIndex + 1]);
    }
  };

  const prevStep = () => {
    // Find the previous step in the visible steps array
    if (currentVisibleStepIndex > 0) {
      setCurrentStep(visibleSteps[currentVisibleStepIndex - 1]);
    }
  };

  // Check if the current step has valid data to proceed
  const canProceed = () => {
    switch(currentStep) {
      case 1: // Data Type
        return responses.dataType !== '';
      case 3: // Use Case
        return responses.useCase !== '';
      case 4: // Internal Priority
        return responses.internalPriority !== '';
      case 5: // Collaboration Type
        return responses.collaborationType !== '';
      case 6: // Reidentification
        return responses.reidentifiable !== '';
      case 7: // Processing Type
        return responses.processingType !== '';
      default:
        return true;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Privacy Prescriber</h1>
          <p className="text-sm">Privacy-preserving technology decision support tool</p>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${(currentVisibleStepIndex / (steps.length - 1)) * 100}%` }}>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow container mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">{allSteps[currentStep].title}</h2>

          {/* Current step component */}
          {allSteps[currentStep].component}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            {currentVisibleStepIndex > 0 ? (
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {currentVisibleStepIndex < steps.length - 1 && (
              <button
                onClick={nextStep}
                className={`px-4 py-2 ${canProceed() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'} text-white rounded flex items-center`}
                disabled={!canProceed()}
              >
                {currentStep === 0 ? 'Get Started' : 'Continue'} <ArrowRight className="ml-1 w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center text-sm">
          <p>Privacy Prescriber Tool - ORCS 4201 Final Project</p>
        </div>
      </footer>
    </div>
  );
};

// Welcome component
const Welcome = () => (
  <div>
    <p className="text-lg font-medium mb-4">Introduction to the Privacy Prescriber</p>
    <p className="mb-4">Answer a few quick questions to help find the best privacy technologies for your project.</p>

    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
      <div className="flex">
        <Info className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
        <p>This tool will guide you through a series of questions to identify the most suitable privacy-preserving technologies for your organization's specific data use case. Your responses will help us provide tailored recommendations that balance privacy protection with your operational needs.</p>
      </div>
    </div>
  </div>
);

// Data Type selection component
const DataTypeStep = ({ responses, setResponses }) => {
  const handleChange = (e) => {
    setResponses({...responses, dataType: e.target.value});
  };

  return (
    <div>
      <p className="mb-4">What kind of data are you working with?</p>

      <div className="space-y-2">
        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="dataType"
            value="pii"
            checked={responses.dataType === 'pii'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">PII (Personally Identifiable Information)</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="dataType"
            value="phi"
            checked={responses.dataType === 'phi'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">PHI (Protected Health Information)</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="dataType"
            value="financial"
            checked={responses.dataType === 'financial'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Financial Data</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="dataType"
            value="nonsensitive"
            checked={responses.dataType === 'nonsensitive'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Non-Sensitive or Aggregate Data</span>
        </label>
      </div>
    </div>
  );
};

// Regulations component
const RegulationsStep = ({ responses, setResponses }) => {
  const handleChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setResponses({...responses, regulations: [...responses.regulations, value]});
    } else {
      setResponses({...responses, regulations: responses.regulations.filter(reg => reg !== value)});
    }
  };

  return (
    <div>
      <p className="mb-4">Are you subject to any regulatory requirements?</p>

      <div className="space-y-2">
        <label className="flex items-center p-2">
          <input
            type="checkbox"
            value="internal"
            checked={responses.regulations.includes('internal')}
            onChange={handleChange}
            className="mr-3"
          />
          <span>Internal analytics</span>
        </label>

        <label className="flex items-center p-2">
          <input
            type="checkbox"
            value="external"
            checked={responses.regulations.includes('external')}
            onChange={handleChange}
            className="mr-3"
          />
          <span>Sharing with external collaborators</span>
        </label>

        <label className="flex items-center p-2">
          <input
            type="checkbox"
            value="public"
            checked={responses.regulations.includes('public')}
            onChange={handleChange}
            className="mr-3"
          />
          <span>Public release (open datasets)</span>
        </label>

        <label className="flex items-center p-2">
          <input
            type="checkbox"
            value="ml"
            checked={responses.regulations.includes('ml')}
            onChange={handleChange}
            className="mr-3"
          />
          <span>Machine learning or AI model training</span>
        </label>
      </div>
    </div>
  );
};

// Use Case component
const UseCaseStep = ({ responses, setResponses }) => {
  const handleChange = (e) => {
    setResponses({...responses, useCase: e.target.value});
  };

  return (
    <div>
      <p className="mb-4">What is your primary use case?</p>

      <div className="space-y-2">
        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="useCase"
            value="internal"
            checked={responses.useCase === 'internal'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Internal analytics</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="useCase"
            value="external"
            checked={responses.useCase === 'external'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Sharing with external collaborators</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="useCase"
            value="public"
            checked={responses.useCase === 'public'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Public release (open datasets)</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="useCase"
            value="ml"
            checked={responses.useCase === 'ml'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Machine learning or AI model training</span>
        </label>
      </div>
    </div>
  );
};

// Internal Priority component
const InternalPriorityStep = ({ responses, setResponses }) => {
  const handleChange = (e) => {
    setResponses({...responses, internalPriority: e.target.value});
  };

  return (
    <div>
      <p className="mb-4">What's most important for your internal analytics?</p>

      <div className="space-y-2">
        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="internalPriority"
            value="simple"
            checked={responses.internalPriority === 'simple'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Simple privacy with minimal overhead</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="internalPriority"
            value="preserve"
            checked={responses.internalPriority === 'preserve'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Preserve individual privacy but keep detail</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="internalPriority"
            value="secure"
            checked={responses.internalPriority === 'secure'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Enable secure analysis across teams</span>
        </label>
      </div>
    </div>
  );
};

// Collaboration type component
const CollaborationTypeStep = ({ responses, setResponses }) => {
  const handleChange = (e) => {
    setResponses({...responses, collaborationType: e.target.value});
  };

  return (
    <div>
      <p className="mb-4">Are you working with trusted or untrusted partners?</p>

      <div className="space-y-2">
        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="collaborationType"
            value="trusted"
            checked={responses.collaborationType === 'trusted'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Trusted (with contracts)</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="collaborationType"
            value="minimal"
            checked={responses.collaborationType === 'minimal'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Minimal trust (need strong security)</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="collaborationType"
            value="none"
            checked={responses.collaborationType === 'none'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">No external partners (internal)</span>
        </label>
      </div>
    </div>
  );
};

// Re-identification step component
const ReidentificationStep = ({ responses, setResponses }) => {
  const handleChange = (e) => {
    setResponses({...responses, reidentifiable: e.target.value});
  };

  return (
    <div>
      <p className="mb-4">Do you want the data to be re-identifiable under certain conditions?</p>

      <div className="space-y-2">
        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="reidentifiable"
            value="no"
            checked={responses.reidentifiable === 'no'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">No (full anonymization)</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="reidentifiable"
            value="yes"
            checked={responses.reidentifiable === 'yes'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Yes (controlled re-identification)</span>
        </label>
      </div>
    </div>
  );
};

// Processing type component
const ProcessingTypeStep = ({ responses, setResponses }) => {
  const handleChange = (e) => {
    setResponses({...responses, processingType: e.target.value});
  };

  return (
    <div>
      <p className="mb-4">Is your data processing centralized or decentralized?</p>

      <div className="space-y-2">
        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="processingType"
            value="centralized"
            checked={responses.processingType === 'centralized'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Centralized (e.g., single server)</span>
        </label>

        <label className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="processingType"
            value="decentralized"
            checked={responses.processingType === 'decentralized'}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="font-medium">Decentralized (e.g., mobile devices)</span>
        </label>
      </div>
    </div>
  );
};

// Summary component
const Summary = ({ responses }) => {
  // Determine recommendations based on responses
  const getRecommendations = () => {
    let recommendations = [];

    // Always include OpenDP
    recommendations.push({
      name: "OpenDP (Differential Privacy Toolkit)",
      link: "https://opendp.org/",
      description: "A toolkit for implementing differential privacy"
    });

    // Include TensorFlow Federated for ML use cases or decentralized processing
    if (responses.useCase === 'ml' || responses.processingType === 'decentralized') {
      recommendations.push({
        name: "TensorFlow Federated",
        link: "https://www.tensorflow.org/federated",
        description: "An open-source framework for machine learning and other computations on decentralized data"
      });
    }

    // Include PySyft for privacy-enhancing ML
    if (responses.useCase === 'ml' || responses.useCase === 'external') {
      recommendations.push({
        name: "PySyft (Privacy-enhancing ML)",
        link: "https://github.com/OpenMined/PySyft",
        description: "A library for secure and private deep learning"
      });
    }

    // Include Google DP Libraries
    recommendations.push({
      name: "Google DP Libraries",
      link: "https://github.com/google/differential-privacy",
      description: "A set of libraries to help perform privacy-preserving analysis"
    });

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div>
      <p className="mb-4 font-medium">Based on your answers, explore:</p>

      <div className="space-y-4 mb-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
            <div>
              <a
                href={rec.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                {rec.name} <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <p className="text-sm text-gray-600">{rec.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="font-medium text-yellow-800 mb-2">Need more help?</p>
        <p className="text-yellow-700">[Optional] Contact us for in-depth consulting!</p>
        <textarea
          className="w-full mt-3 p-2 border border-gray-300 rounded h-24"
          placeholder="Enter your questions or contact details here..."
        ></textarea>
      </div>
    </div>
  );
};

export default PrivacyPrescriber;
