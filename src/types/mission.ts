import JobInterface from './job'

export default interface MissionInterface {
    id: string;
    status: string;
    isLocked: boolean;
    type: string;
    gameId: string;
    isUnderReview: boolean;
    isEvaluated: boolean;
    progress: number;
    isRecruiter: boolean;
    score: number;
    selectedJob: JobInterface
    time: string;
}