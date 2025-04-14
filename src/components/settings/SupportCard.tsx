
export const SupportCard = ({ onContactSupport }: { onContactSupport: () => void }) => {
  return (
    <div className="card bg-gradient-to-br from-primary/10 to-secondary/10">
      <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
      <p className="text-muted-foreground mb-4">
        Our support team is always ready to assist you with any questions or issues.
      </p>
      <button onClick={onContactSupport} className="btn-primary w-full">
        Contact Support
      </button>
    </div>
  );
};
