import React, { useEffect } from "react";
import {
	Trophy,
	Crown,
	Medal,
	Twitter,
	Instagram,
	Youtube,
	Twitch,
	ExternalLink,
	Info,
	
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRoobetStore } from "../store/RoobetStore";
import { KickIcon } from "@/components/ui/icons/KickIcon";
const LeaderboardPage: React.FC = () => {
	const { leaderboard, loading, error, fetchLeaderboard } = useRoobetStore();

	useEffect(() => {
		fetchLeaderboard();
	}, []);

	const top3 = leaderboard?.data?.slice(0, 3) || [];

	const socialLinks = [
		{
			name: "Twitter",
			icon: Twitter,
			url: "https://twitter.com/louiskHz",
			color: "hover:text-blue-400",
		},
		{
			name: "Instagram",
			icon: Instagram,
			url: "https://www.instagram.com/louiskhz",
			color: "hover:text-pink-400",
		},
		{
			name: "YouTube",
			icon: Youtube,
			url: "https://www.youtube.com/@LouisKHz",
			color: "hover:text-red-400",
		},
		{
			name: "Kick",
			icon: KickIcon,
			url: "https://kick.com/louiskhz",
			color: "hover:text-green-400",
		},
	];

	const iconMap = [Crown, Trophy, Medal];
	const colorMap = ["text-yellow-400", "text-gray-300", "text-orange-400"];
	const prizeMap = ["$5,000", "$3,000", "$1,500"]; // example prize display

	return (
		<div className='min-h-screen bg-[#181839] text-[#fffefe] p-4 md:p-8'>
			<div className='max-w-4xl mx-auto space-y-8'>
				{/* Header */}
				<div className='space-y-4 text-center'>
					<h1 className='text-4xl md:text-6xl font-bold text-[#efae0e]'>
						Roobet Leaderboard
					</h1>
					<p className='text-[#fffefe]/70 text-lg'>
						Compete for the top prizes with your wagers
					</p>
				</div>

				{/* Streamer Section */}
				<Card className='bg-[#181839]/90 border border-[#efae0e]/40 shadow-xl'>
					<CardHeader className='pb-4 text-center'>
						<div className='w-24 h-24 mx-auto bg-[#efae0e]/20 rounded-full flex items-center justify-center mb-4'>
							<Crown className='w-12 h-12 text-[#efae0e]' />
						</div>
						<CardTitle className='text-3xl font-bold text-[#efae0e]'>
							LouisKHz
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='flex flex-wrap justify-center gap-4'>
							{socialLinks.map((social) => (
								<Button
									key={social.name}
									variant='outline'
									size='lg'
									className={`flex items-center gap-2 border-[#efae0e]/40 text-[#fffefe] hover:text-[#efae0e] transition-colors ${social.color}`}
									asChild
								>
									<a
										href={social.url}
										target='_blank'
										rel='noopener noreferrer'
									>
										<social.icon className='w-5 h-5' />
										{social.name}
										<ExternalLink className='w-4 h-4' />
									</a>
								</Button>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Leaderboard Rules */}
				<Card className='bg-[#181839]/90 border border-[#efae0e]/30 shadow-md'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-[#efae0e]'>
							<Info className='w-6 h-6' />
							Leaderboard Rules
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4 text-[#fffefe]/80'>
						<p className='text-[#fffefe] font-medium'>
							Your wagers on Roobet will count towards the leaderboard at the
							following weights based on the games you are playing. This helps
							prevent leaderboard abuse:
						</p>
						<div className='space-y-3'>
							<div className='flex items-center gap-3 p-3 bg-[#efae0e]/10 rounded-lg'>
								<div className='w-3 h-3 bg-green-400 rounded-full'></div>
								<span>
									<strong>Games with RTP ≤ 97%</strong> contribute{" "}
									<strong className='text-[#efae0e]'>100%</strong> of wagered
									amount
								</span>
							</div>
							<div className='flex items-center gap-3 p-3 bg-[#efae0e]/10 rounded-lg'>
								<div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
								<span>
									<strong>Games with RTP &gt; 97%</strong> contribute{" "}
									<strong className='text-[#efae0e]'>50%</strong> of wagered
									amount
								</span>
							</div>
							<div className='flex items-center gap-3 p-3 bg-[#efae0e]/10 rounded-lg'>
								<div className='w-3 h-3 bg-orange-400 rounded-full'></div>
								<span>
									<strong>Games with RTP ≥ 98%</strong> contribute{" "}
									<strong className='text-[#efae0e]'>10%</strong> of wagered
									amount
								</span>
							</div>
						</div>
						<p className='text-sm bg-[#efae0e]/10 p-3 rounded-lg border-l-4 border-[#efae0e]'>
							<strong>Note:</strong> Only Slots and House games count (Dice is
							excluded)
						</p>
					</CardContent>
				</Card>

				{/* Top 3 Leaderboard */}
				<div className='space-y-6'>
					<h2 className='text-2xl font-bold text-center text-[#efae0e]'>
						Current Top 3
					</h2>

					{loading && <p className='text-center'>Loading leaderboard...</p>}
					{error && <p className='text-center text-red-400'>{error}</p>}

					<div className='grid gap-6 md:grid-cols-3'>
						{top3.map((player, index) => {
							const IconComponent = iconMap[index] || Trophy;
							const color = colorMap[index] || "text-[#efae0e]";
							const prize = prizeMap[index] || "$500";
							return (
								<Card
									key={player.uid}
									className={`bg-[#181839]/90 border border-[#efae0e]/30 text-center transition-transform hover:scale-105 ${
										index === 0 ? "shadow-lg border-[#efae0e]/60" : ""
									}`}
								>
									<CardHeader className='pb-3'>
										<div className='relative'>
											<div
												className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
													index === 0
														? "bg-gradient-to-tr from-[#efae0e] to-[#fffefe]"
														: "bg-[#efae0e]/20"
												}`}
											>
												<IconComponent className={`w-8 h-8 ${color}`} />
											</div>
											<Badge
												variant='secondary'
												className='absolute -top-2 -right-2 text-xs font-bold bg-[#efae0e]/20 text-[#efae0e]'
											>
												#{index + 1}
											</Badge>
										</div>
										<CardTitle className='text-xl text-[#fffefe]'>
											{player.username}
										</CardTitle>
									</CardHeader>
									<CardContent className='space-y-4'>
										<div className='space-y-2'>
											<div className='text-sm text-[#fffefe]/70'>
												Total Wagered
											</div>
											<div className='text-2xl font-bold text-[#fffefe]'>
												{player.wagered.toLocaleString()}c
											</div>
										</div>
										<div className='pt-4 border-t border-[#efae0e]/30'>
											<div className='text-sm text-[#fffefe]/70 mb-1'>
												Prize Pool
											</div>
											<div
												className={`text-xl font-bold ${
													index === 0 ? "text-[#efae0e]" : "text-[#fffefe]"
												}`}
											>
												{prize}
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>

				{/* Call to Action */}
				<div className='space-y-4 text-center'>
					<Button
						size='lg'
						className='bg-[#efae0e] hover:bg-[#fffefe] text-[#181839] text-lg px-8 py-6 font-bold shadow-lg hover:shadow-xl transition-shadow'
					>
						Start Playing on Roobet
					</Button>
					<p className='text-sm text-[#fffefe]/70'>
						Place your wagers and climb the leaderboard for amazing prizes!
					</p>
				</div>
			</div>
		</div>
	);
};

export default LeaderboardPage;
