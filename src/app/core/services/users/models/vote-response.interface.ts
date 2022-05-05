export interface VoteResponseInterface {
    succed: boolean;
    code: number;
    message: voteMessageData;
}
interface voteMessageData {
    numberOfVotes: number
}