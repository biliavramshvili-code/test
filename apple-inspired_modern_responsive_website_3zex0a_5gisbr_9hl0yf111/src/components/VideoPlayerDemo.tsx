import React from 'react';
import VideoPlayer from './VideoPlayer';

const VideoPlayerDemo: React.FC = () => {
  // Working video URLs that are publicly accessible
  const sampleVideos = [
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Big Buck Bunny - Sample Video"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      poster: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Elephants Dream - Creative Commons"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4af9e9b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "For Bigger Blazes - Demo Video"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-padding">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-apple-gray-700 mb-6">
            Video Player Component
          </h2>
          <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
            A fully-featured HTML5 video player with custom controls, accessibility support, and responsive design.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-apple-blue-50 border border-apple-blue-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-apple-blue-500 rounded-full flex-shrink-0 mt-0.5"></div>
            <div>
              <h4 className="font-semibold text-apple-blue-900 mb-1">Demo Videos</h4>
              <p className="text-sm text-apple-blue-700">
                These are sample videos from Google's test video collection. They should load reliably across all browsers and networks.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {sampleVideos.map((video, index) => (
            <div key={index} className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-apple-gray-700 mb-4">
                {video.title}
              </h3>
              <VideoPlayer
                src={video.src}
                poster={video.poster}
                title={video.title}
                className="w-full"
              />
              
              {/* Video Information */}
              <div className="mt-6 p-6 bg-apple-gray-50 rounded-xl">
                <h4 className="font-semibold text-apple-gray-700 mb-3">Features:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-apple-gray-600">
                  <ul className="space-y-2">
                    <li>• Custom HTML5 video controls</li>
                    <li>• Responsive 16:9 aspect ratio</li>
                    <li>• Keyboard navigation support</li>
                    <li>• Fullscreen functionality</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>• Volume control with mute</li>
                    <li>• Progress bar with seeking</li>
                    <li>• Error handling and loading states</li>
                    <li>• ARIA labels for accessibility</li>
                  </ul>
                </div>
                
                <div className="mt-4 p-4 bg-white rounded-lg border border-apple-gray-200">
                  <h5 className="font-medium text-apple-gray-700 mb-2">Keyboard Shortcuts:</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-apple-gray-600">
                    <div><kbd className="bg-apple-gray-100 px-1 rounded">Space</kbd> Play/Pause</div>
                    <div><kbd className="bg-apple-gray-100 px-1 rounded">←/→</kbd> Skip ±10s</div>
                    <div><kbd className="bg-apple-gray-100 px-1 rounded">↑/↓</kbd> Volume</div>
                    <div><kbd className="bg-apple-gray-100 px-1 rounded">F</kbd> Fullscreen</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Local Video Instructions */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="card p-8 bg-gradient-to-br from-apple-gray-50 to-white">
            <h3 className="text-2xl font-bold text-apple-gray-700 mb-6">Using Your Own Videos</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-apple-gray-700 mb-3">Local Video Files:</h4>
                <div className="bg-apple-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-apple-gray-600 mb-3">
                    To use local video files, place them in the <code className="bg-white px-1 rounded">public</code> folder:
                  </p>
                  <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
{`public/
  videos/
    sample-video.mp4
    another-video.mp4`}
                  </pre>
                  <p className="text-sm text-apple-gray-600 mt-3">
                    Then reference them with: <code className="bg-white px-1 rounded">src="/videos/sample-video.mp4"</code>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-apple-gray-700 mb-3">Basic Usage:</h4>
                <pre className="bg-apple-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<VideoPlayer
  src="/videos/your-video.mp4"
  poster="/images/video-poster.jpg"
  title="Your Video Title"
  className="w-full max-w-4xl mx-auto"
/>`}
                </pre>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-apple-gray-700 mb-3">Recommended Video Sources:</h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• <strong>Google Cloud Storage:</strong> commondatastorage.googleapis.com (used in demos above)</li>
                    <li>• <strong>Your own CDN:</strong> Upload to your server or cloud storage</li>
                    <li>• <strong>Video hosting services:</strong> Vimeo, YouTube (with proper embed URLs)</li>
                    <li>• <strong>Local files:</strong> Place in public folder for development</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-apple-gray-700 mb-3">Props:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-apple-gray-200">
                        <th className="text-left py-2 font-semibold">Prop</th>
                        <th className="text-left py-2 font-semibold">Type</th>
                        <th className="text-left py-2 font-semibold">Required</th>
                        <th className="text-left py-2 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-apple-gray-600">
                      <tr className="border-b border-apple-gray-100">
                        <td className="py-2 font-mono">src</td>
                        <td className="py-2">string</td>
                        <td className="py-2">Yes</td>
                        <td className="py-2">Video source URL (MP4 recommended)</td>
                      </tr>
                      <tr className="border-b border-apple-gray-100">
                        <td className="py-2 font-mono">poster</td>
                        <td className="py-2">string</td>
                        <td className="py-2">No</td>
                        <td className="py-2">Poster image URL</td>
                      </tr>
                      <tr className="border-b border-apple-gray-100">
                        <td className="py-2 font-mono">title</td>
                        <td className="py-2">string</td>
                        <td className="py-2">No</td>
                        <td className="py-2">Video title for accessibility</td>
                      </tr>
                      <tr className="border-b border-apple-gray-100">
                        <td className="py-2 font-mono">autoPlay</td>
                        <td className="py-2">boolean</td>
                        <td className="py-2">No</td>
                        <td className="py-2">Auto-play video on load</td>
                      </tr>
                      <tr className="border-b border-apple-gray-100">
                        <td className="py-2 font-mono">muted</td>
                        <td className="py-2">boolean</td>
                        <td className="py-2">No</td>
                        <td className="py-2">Start video muted</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono">loop</td>
                        <td className="py-2">boolean</td>
                        <td className="py-2">No</td>
                        <td className="py-2">Loop video playback</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-apple-gray-700 mb-3">Browser Support:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Chrome 4+</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Firefox 3.5+</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Safari 3.1+</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Edge 12+</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-apple-gray-700 mb-3">Video Format Recommendations:</h4>
                <ul className="space-y-2 text-sm text-apple-gray-600">
                  <li>• <strong>MP4 (H.264)</strong> - Best cross-browser compatibility</li>
                  <li>• <strong>WebM (VP9)</strong> - Good for modern browsers, smaller file sizes</li>
                  <li>• <strong>OGV (Theora)</strong> - Fallback for older Firefox versions</li>
                  <li>• Recommended resolution: 1920x1080 (1080p) or 1280x720 (720p)</li>
                  <li>• Keep file sizes reasonable for web delivery (under 50MB recommended)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-apple-gray-700 mb-3">Troubleshooting:</h4>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li>• <strong>CORS Issues:</strong> External video URLs may be blocked by CORS policies</li>
                    <li>• <strong>Network Issues:</strong> Check your internet connection and video URL accessibility</li>
                    <li>• <strong>Format Support:</strong> Ensure your video is in MP4 format for best compatibility</li>
                    <li>• <strong>File Size:</strong> Large video files may take time to load or fail on slow connections</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPlayerDemo;
