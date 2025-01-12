import { useState, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { MdShare } from 'react-icons/md';
import { useAuth } from '../../context/useAuth';

const ShowVideos = () => {
  const [videoData, setVideoData] = useState([
    {
      videoUrl: './assets/Goku.mp4',
      title: 'Road Adventure',
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    },
    {
      videoUrl: './assets/Vegeta.mp4',
      title: 'Nature',
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    },
    {
      videoUrl: './assets/Roadtrip.mp4',
      title: 'Travel',
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    },
    {
      videoUrl: './assets/Bike.mp4',
      title: 'Ride the Bike',
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    },
  ]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const videoRef = useRef(null);
  const { user } = useAuth();

  const handleNavigate = (direction) => {
    const newIndex =
      direction === 'next'
        ? (currentVideoIndex + 1) % videoData.length
        : (currentVideoIndex - 1 + videoData.length) % videoData.length;
    setCurrentVideoIndex(newIndex);
  };

  const handleLikeDislike = (type) => {
    if (!user) {
      alert('Please login to interact with videos!');
      return;
    }

    const updatedVideo = { ...videoData[currentVideoIndex] };
    if (type === 'like') {
      if (!updatedVideo.likedBy.includes(user.username)) {
        updatedVideo.likes += 1;
        updatedVideo.likedBy.push(user.username);
        if (updatedVideo.dislikedBy.includes(user.username)) {
          updatedVideo.dislikes -= 1;
          updatedVideo.dislikedBy = updatedVideo.dislikedBy.filter((u) => u !== user.username);
        }
      }
    } else {
      if (!updatedVideo.dislikedBy.includes(user.username)) {
        updatedVideo.dislikes += 1;
        updatedVideo.dislikedBy.push(user.username);
        if (updatedVideo.likedBy.includes(user.username)) {
          updatedVideo.likes -= 1;
          updatedVideo.likedBy = updatedVideo.likedBy.filter((u) => u !== user.username);
        }
      }
    }

    setVideoData((prev) =>
      prev.map((video, index) => (index === currentVideoIndex ? updatedVideo : video))
    );
  };

  const handleShare = () => {
    const videoUrl = videoData[currentVideoIndex].videoUrl;
    navigator.clipboard.writeText(videoUrl).then(() => {
      setShareMessage('Link copied to clipboard!');
      setTimeout(() => setShareMessage(''), 2000);
    });
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [...prev, { username: user?.username || 'Guest', text: newComment }]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-white mb-4">Video Showcase</h1>

      {/* Video Section */}
      <div className="w-full max-w-xl relative mb-8">
        <video
          className="w-full h-96 rounded-lg shadow-lg"
          src={videoData[currentVideoIndex]?.videoUrl}
          ref={videoRef}
          controls
        />
        <button
          onClick={() => handleNavigate('prev')}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full shadow-lg"
        >
          <FaAngleLeft size={24} />
        </button>
        <button
          onClick={() => handleNavigate('next')}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full shadow-lg"
        >
          <FaAngleRight size={24} />
        </button>
      </div>

      {/* Video Info & Interactions */}
      <div className="w-full max-w-xl bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center text-white">
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleLikeDislike('like')}
            className={`flex items-center gap-2 p-2 rounded-md ${
              videoData[currentVideoIndex]?.likedBy.includes(user?.username)
                ? 'bg-green-600'
                : 'bg-transparent border border-green-600 text-green-600'
            } transition`}
          >
            <AiFillLike size={20} /> {videoData[currentVideoIndex]?.likes}
          </button>
          <button
            onClick={() => handleLikeDislike('dislike')}
            className={`flex items-center gap-2 p-2 rounded-md ${
              videoData[currentVideoIndex]?.dislikedBy.includes(user?.username)
                ? 'bg-red-600'
                : 'bg-transparent border border-red-600 text-red-600'
            } transition`}
          >
            <AiFillDislike size={20} /> {videoData[currentVideoIndex]?.dislikes}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 p-2 bg-transparent border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            <MdShare size={20} /> Share
          </button>
        </div>
        {shareMessage && (
          <p className="text-sm text-blue-600">{shareMessage}</p>
        )}
      </div>

      {/* Comments Section */}
      <div className="w-full max-w-xl mt-8 bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-white mb-4">Comments</h3>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-md shadow-md"
            >
              <p className="text-gray-800 font-semibold">{comment.username}</p>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            onClick={handleCommentSubmit}
            className="ml-4 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowVideos;
