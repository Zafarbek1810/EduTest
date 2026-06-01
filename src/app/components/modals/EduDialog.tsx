import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface EduDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/** EduTest Pro dizayniga mos dialog */
export function EduDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: EduDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`bg-card border-border rounded-[14px] sm:max-w-md z-[100] ${className ?? ''}`}
      >
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="py-2">{children}</div>
        {footer && <DialogFooter className="gap-2 sm:gap-2">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
