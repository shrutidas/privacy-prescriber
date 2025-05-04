const Disclaimer = () => {
  return (
    <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-lg">
      <h3 className="text-lg font-bold text-amber-800 mb-3">Important Disclaimer</h3>

      <p className="mb-3 text-amber-900">
        This Privacy Prescriber tool provides general guidance based on your inputs but is not exhaustive or comprehensive. The privacy technology landscape is complex and evolving rapidly.
      </p>

      <div className="mb-3 text-amber-900">
        <p className="mb-2">
          <strong>Please note:</strong> Whether you are using emerging privacy-enhancing technologies (PETs) or not, there are best practices that should be followed to ensure data is shared and processed securely and responsibly. Using an individual PET does not in itself guarantee an improvement in privacy unless accompanied by a good overall privacy and security design, and appropriate governance arrangements.
        </p>
      </div>

      <p className="mb-3 text-amber-900">
        Examples of good practice include:
      </p>

      <ul className="list-disc pl-5 mb-4 text-amber-900">
        <li className="mb-1">Conducting thorough privacy impact assessments</li>
        <li className="mb-1">Implementing data minimization principles</li>
        <li className="mb-1">Establishing strong access controls and authentication</li>
        <li className="mb-1">Regular security audits and updates</li>
        <li className="mb-1">Creating transparent privacy policies</li>
        <li className="mb-1">Providing appropriate staff training</li>
      </ul>

      <p className="text-sm text-amber-700">
        This tool is designed for educational purposes as part of ORCS 4201 and should not be considered legal or professional advice. For specific privacy implementation guidance, please consult with qualified privacy professionals or legal experts.
      </p>
    </div>
  );
};

export default Disclaimer;
