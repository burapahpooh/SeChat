import { Skeleton } from "@chakra-ui/skeleton";

const NewsLoading = () => {
  return (
    <div style={{width:"100%",height:"100%"}}>
      <Skeleton style={{width:"100%",height:"100%"}} />
    </div>
  );
};

export default NewsLoading;