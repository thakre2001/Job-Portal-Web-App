import java.util.Scanner;

public class exm{
    public static void main(String[] args) {
        int arr[]={6,8,4,1,8,5,7};
        int k=3;
        int flag=0;
        for(int i =0; i<arr.length/2;i++){
            if(arr[i]==arr[i+k]){
                flag++;
            }
        }
        if(flag >0){
            System.out.println(true);
        }else{
            System.out.println(false);
        }
    }
}