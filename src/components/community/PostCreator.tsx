
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";

interface PostCreatorProps {
  availableSubjects: string[];
}

const PostCreator = ({ availableSubjects }: PostCreatorProps) => {
  const [newPostContent, setNewPostContent] = useState("");

  const handlePostSubmit = () => {
    if (newPostContent.trim()) {
      alert("Please connect to Supabase to enable community functionality.");
      setNewPostContent("");
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea 
              placeholder="Share a question, resource or achievement with your grade community..." 
              className="mb-2 resize-none"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 12}, (_, i) => i + 1).map((grade) => (
                      <SelectItem key={grade} value={grade.toString()}>Grade {grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handlePostSubmit}
                disabled={!newPostContent.trim()}
              >
                <Send size={16} className="mr-2" /> Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCreator;
